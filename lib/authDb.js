import crypto from 'crypto';
import { db } from './firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function normalizeEmail(email) {
  return String(email || '').toLowerCase().trim();
}

function cleanPhone(phone) {
  return String(phone || '').trim();
}

function generateReaderId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `PR-${num}`;
}

/**
 * Get user by email strictly from Cloud Firestore
 */
export async function getUserByEmail(email) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) return null;

  try {
    const userDocRef = doc(db, 'users', normEmail);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (firestoreErr) {
    console.error('Error fetching user from Cloud Firestore:', firestoreErr.message);
    return null;
  }
}

/**
 * Save user strictly to Cloud Firestore
 */
async function saveUser(normEmail, userData) {
  try {
    const userDocRef = doc(db, 'users', normEmail);
    await setDoc(userDocRef, userData, { merge: true });
  } catch (firestoreErr) {
    console.error('Error saving user to Cloud Firestore:', firestoreErr.message);
    throw firestoreErr;
  }
}

/**
 * Register or update a user upon purchase or signup
 * Creates permanent Reader ID (PR-XXXXXX) with single-device active session in Firestore
 */
export async function registerOrUpdateUser({
  email,
  name,
  phone = '',
  booksToAdd = [],
  deviceId = '',
  deviceInfo = ''
}) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) throw new Error('Valid email required');

  const existing = await getUserByEmail(normEmail);

  const now = new Date().toISOString();
  const sessionToken = `sess_${crypto.randomBytes(24).toString('hex')}`;
  const userId = existing?.userId || generateReaderId();

  let userPurchases = existing?.purchasedBooks || [];
  if (booksToAdd && booksToAdd.length > 0) {
    const set = new Set([...userPurchases, ...booksToAdd]);
    userPurchases = Array.from(set);
  }

  const updatedUser = {
    userId,
    email: normEmail,
    name: name?.trim() || existing?.name || 'Reader',
    phone: cleanPhone(phone) || existing?.phone || '',
    purchasedBooks: userPurchases,
    createdAt: existing?.createdAt || now,
    activeSessionToken: sessionToken,
    activeDeviceId: deviceId || existing?.activeDeviceId || `dev_${Date.now()}`,
    activeDeviceInfo: deviceInfo || existing?.activeDeviceInfo || 'Browser Device',
    lastActiveAt: now,
    freeChatSecondsRemaining: existing?.freeChatSecondsRemaining !== undefined ? existing.freeChatSecondsRemaining : 300,
    freeLimitReached: Boolean(existing?.freeLimitReached || (existing?.freeChatSecondsRemaining !== undefined && existing.freeChatSecondsRemaining <= 0)),
  };

  await saveUser(normEmail, updatedUser);

  return {
    user: updatedUser,
    sessionToken,
  };
}

/**
 * Log into user account and claim the active single-device session (WhatsApp-style takeover)
 * Disconnects any previously active phone or browser in real-time via Firestore!
 */
export async function loginAndClaimSession({
  email,
  name = '',
  phone = '',
  deviceId = '',
  deviceInfo = ''
}) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) throw new Error('Email is required');

  let user = await getUserByEmail(normEmail);

  const now = new Date().toISOString();
  const sessionToken = `sess_${crypto.randomBytes(24).toString('hex')}`;

  if (!user) {
    // Auto-create account in Cloud Firestore with unique Reader ID
    user = {
      userId: generateReaderId(),
      email: normEmail,
      name: name?.trim() || 'Reader',
      phone: cleanPhone(phone),
      purchasedBooks: [],
      createdAt: now,
      activeSessionToken: sessionToken,
      activeDeviceId: deviceId || `dev_${Date.now()}`,
      activeDeviceInfo: deviceInfo || 'Browser Device',
      lastActiveAt: now,
      freeChatSecondsRemaining: 300,
      freeLimitReached: false,
    };
  } else {
    if (name?.trim()) {
      user.name = name.trim();
    }
    if (cleanPhone(phone)) {
      user.phone = cleanPhone(phone);
    }
    if (!user.userId) {
      user.userId = generateReaderId();
    }
    if (user.freeChatSecondsRemaining === undefined) {
      user.freeChatSecondsRemaining = 300;
    }
    user.freeLimitReached = Boolean(user.freeLimitReached || user.freeChatSecondsRemaining <= 0);
    // OVERWRITE sessionToken -> this immediately disconnects any prior device!
    user.activeSessionToken = sessionToken;
    user.activeDeviceId = deviceId || user.activeDeviceId || `dev_${Date.now()}`;
    user.activeDeviceInfo = deviceInfo || 'Browser Device';
    user.lastActiveAt = now;
  }

  await saveUser(normEmail, user);

  return {
    user,
    sessionToken,
  };
}

/**
 * Validate active session directly against Cloud Firestore
 * Returns valid: true if sessionToken matches the user's current activeSessionToken.
 * Returns valid: false if another device has logged in.
 */
export async function validateActiveSession({ email, sessionToken }) {
  const normEmail = normalizeEmail(email);
  if (!normEmail || !sessionToken) {
    return { valid: false, reason: 'MISSING_CREDENTIALS' };
  }

  const user = await getUserByEmail(normEmail);

  if (!user) {
    return { valid: false, reason: 'USER_NOT_FOUND' };
  }

  // CONCURRENT DEVICE CHECK (WhatsApp-style single active device)
  if (!user.activeSessionToken || user.activeSessionToken !== sessionToken) {
    return {
      valid: false,
      reason: 'CONCURRENT_DEVICE_TAKEOVER',
      message: 'You have been disconnected because your account was logged into on another device.',
      currentActiveDevice: user.activeDeviceInfo || 'Another device',
      lastActiveAt: user.lastActiveAt,
    };
  }

  // Update heartbeat in Firestore
  user.lastActiveAt = new Date().toISOString();
  await saveUser(normEmail, user);

  return {
    valid: true,
    user: {
      userId: user.userId,
      email: user.email,
      name: user.name,
      phone: user.phone,
      purchasedBooks: user.purchasedBooks || [],
      activeDeviceInfo: user.activeDeviceInfo,
      lastActiveAt: user.lastActiveAt,
      freeChatSecondsRemaining: user.freeChatSecondsRemaining !== undefined ? user.freeChatSecondsRemaining : 300,
      freeLimitReached: Boolean(user.freeLimitReached || (user.freeChatSecondsRemaining !== undefined && user.freeChatSecondsRemaining <= 0)),
    },
  };
}

/**
 * Update user's chat usage in Cloud Firestore to persist 5-min limit across sessions & refreshes
 */
export async function updateChatUsage({ email, secondsRemaining, freeLimitReached }) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) return null;
  const user = await getUserByEmail(normEmail);
  if (!user) return null;

  const sec = typeof secondsRemaining === 'number' ? Math.max(0, Math.floor(secondsRemaining)) : (user.freeChatSecondsRemaining ?? 300);
  const isReached = Boolean(freeLimitReached || sec <= 0);

  user.freeChatSecondsRemaining = sec;
  user.freeLimitReached = isReached;
  user.lastActiveAt = new Date().toISOString();

  await saveUser(normEmail, user);
  return {
    freeChatSecondsRemaining: sec,
    freeLimitReached: isReached
  };
}

/**
 * Grant books to an existing or new user in Cloud Firestore
 */
export async function grantBooksToUser(email, name, bookIds = [], phone = '') {
  const normEmail = normalizeEmail(email);
  const user = await getUserByEmail(normEmail);

  if (user) {       
    const set = new Set([...(user.purchasedBooks || []), ...bookIds]);
    user.purchasedBooks = Array.from(set);
    if (name?.trim()) user.name = name.trim();
    if (cleanPhone(phone)) user.phone = cleanPhone(phone);
    if (!user.userId) user.userId = generateReaderId();
    await saveUser(normEmail, user);
    return user;
  } else {
    const res = await registerOrUpdateUser({ email, name, phone, booksToAdd: bookIds });
    return res.user;
  }
}
