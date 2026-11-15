import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { db } from './firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure local fallback database file and directory exist
function ensureDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      const initialData = {
        users: {
          'reader@peoplereadingseries.com': {
            email: 'reader@peoplereadingseries.com',
            name: 'Demo Reader',
            purchasedBooks: [
              'the-charmer',
              'the-negotiator',
              'the-detective',
              'the-leader',
              'the-heart-reader'
            ],
            createdAt: new Date().toISOString(),
            activeSessionToken: null,
            activeDeviceId: null,
            activeDeviceInfo: 'Initial Demo Setup',
            lastActiveAt: new Date().toISOString()
          }
        }
      };
      fs.writeFileSync(USERS_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Notice ensuring local auth database:', err.message);
  }
}

function readLocalDb() {
  ensureDb();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: {} };
  }
}

function writeLocalDb(data) {
  ensureDb();
  try {
    const tempFile = `${USERS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempFile, USERS_FILE);
  } catch (err) {
    console.error('Notice writing local auth cache:', err.message);
  }
}

function normalizeEmail(email) {
  return String(email || '').toLowerCase().trim();
}

/**
 * Get user by email from Cloud Firestore (with local cache fallback)
 */
export async function getUserByEmail(email) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) return null;

  try {
    // 1. Try Cloud Firestore
    const userDocRef = doc(db, 'users', normEmail);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const userData = snap.data();
      // Sync to local cache
      const local = readLocalDb();
      local.users[normEmail] = userData;
      writeLocalDb(local);
      return userData;
    }
  } catch (firestoreErr) {
    console.warn('Firestore fetch notice, using local cache:', firestoreErr.message);
  }

  // 2. Fallback to local cache
  const localDb = readLocalDb();
  return localDb.users[normEmail] || null;
}

/**
 * Save user to Cloud Firestore and sync local cache
 */
async function saveUser(normEmail, userData) {
  // Sync to local cache immediately
  try {
    const local = readLocalDb();
    local.users[normEmail] = userData;
    writeLocalDb(local);
  } catch (e) {
    console.warn('Local cache write notice:', e.message);
  }

  // Save to Cloud Firestore
  try {
    const userDocRef = doc(db, 'users', normEmail);
    await setDoc(userDocRef, userData, { merge: true });
  } catch (firestoreErr) {
    console.error('Error syncing user to Cloud Firestore:', firestoreErr.message);
  }
}

/**
 * Register or update a user upon purchase or signup
 */
export async function registerOrUpdateUser({ email, name, booksToAdd = [], deviceId = '', deviceInfo = '' }) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) throw new Error('Valid email required');

  const existing = await getUserByEmail(normEmail);

  const now = new Date().toISOString();
  const sessionToken = `sess_${crypto.randomBytes(24).toString('hex')}`;

  let userPurchases = existing?.purchasedBooks || [];
  if (booksToAdd && booksToAdd.length > 0) {
    const set = new Set([...userPurchases, ...booksToAdd]);
    userPurchases = Array.from(set);
  }

  const updatedUser = {
    email: normEmail,
    name: name?.trim() || existing?.name || 'Reader',
    purchasedBooks: userPurchases,
    createdAt: existing?.createdAt || now,
    activeSessionToken: sessionToken,
    activeDeviceId: deviceId || existing?.activeDeviceId || `dev_${Date.now()}`,
    activeDeviceInfo: deviceInfo || existing?.activeDeviceInfo || 'Browser Device',
    lastActiveAt: now,
  };

  await saveUser(normEmail, updatedUser);

  return {
    user: updatedUser,
    sessionToken,
  };
}

/**
 * Log into user account and claim the active single-device session (WhatsApp takeover)
 */
export async function loginAndClaimSession({ email, name, deviceId = '', deviceInfo = '' }) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) throw new Error('Email is required');

  let user = await getUserByEmail(normEmail);

  const now = new Date().toISOString();
  const sessionToken = `sess_${crypto.randomBytes(24).toString('hex')}`;

  if (!user) {
    // Auto-create account with default teaser access
    user = {
      email: normEmail,
      name: name?.trim() || 'Reader',
      purchasedBooks: [],
      createdAt: now,
      activeSessionToken: sessionToken,
      activeDeviceId: deviceId || `dev_${Date.now()}`,
      activeDeviceInfo: deviceInfo || 'Browser Device',
      lastActiveAt: now,
    };
  } else {
    if (name?.trim()) {
      user.name = name.trim();
    }
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
 * Validate active session
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

  // Update heartbeat
  user.lastActiveAt = new Date().toISOString();
  await saveUser(normEmail, user);

  return {
    valid: true,
    user: {
      email: user.email,
      name: user.name,
      purchasedBooks: user.purchasedBooks,
      activeDeviceInfo: user.activeDeviceInfo,
      lastActiveAt: user.lastActiveAt,
    },
  };
}

/**
 * Grant books to an existing or new user
 */
export async function grantBooksToUser(email, name, bookIds = []) {
  const normEmail = normalizeEmail(email);
  const user = await getUserByEmail(normEmail);

  if (user) {
    const set = new Set([...(user.purchasedBooks || []), ...bookIds]);
    user.purchasedBooks = Array.from(set);
    if (name?.trim()) user.name = name.trim();
    await saveUser(normEmail, user);
    return user;
  } else {
    const res = await registerOrUpdateUser({ email, name, booksToAdd: bookIds });
    return res.user;
  }
}
