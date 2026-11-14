import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure database file and directory exist
function ensureDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      const initialData = {
        users: {
          // Pre-seed demo reader for instant testing
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
    console.error('Error ensuring auth database:', err);
  }
}

// Read database
function readDb() {
  ensureDb();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading auth database, resetting:', err);
    return { users: {} };
  }
}

// Write database atomically
function writeDb(data) {
  ensureDb();
  try {
    const tempFile = `${USERS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempFile, USERS_FILE);
  } catch (err) {
    console.error('Error writing auth database:', err);
  }
}

function normalizeEmail(email) {
  return String(email || '').toLowerCase().trim();
}

/**
 * Get user by email
 */
export function getUserByEmail(email) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) return null;
  const db = readDb();
  return db.users[normEmail] || null;
}

/**
 * Register or update a user upon purchase or signup
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.name
 * @param {string[]} [params.booksToAdd]
 * @param {string} [params.deviceId]
 * @param {string} [params.deviceInfo]
 */
export function registerOrUpdateUser({ email, name, booksToAdd = [], deviceId = '', deviceInfo = '' }) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) throw new Error('Valid email required');

  const db = readDb();
  const existing = db.users[normEmail];

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

  db.users[normEmail] = updatedUser;
  writeDb(db);

  return {
    user: updatedUser,
    sessionToken,
  };
}

/**
 * Log into user account and claim the active single-device session (WhatsApp takeover)
 */
export function loginAndClaimSession({ email, name, deviceId = '', deviceInfo = '' }) {
  const normEmail = normalizeEmail(email);
  if (!normEmail) throw new Error('Email is required');

  const db = readDb();
  let user = db.users[normEmail];

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
    // If name was provided, keep it updated
    if (name?.trim()) {
      user.name = name.trim();
    }
    // OVERWRITE sessionToken -> this immediately disconnects any prior device!
    user.activeSessionToken = sessionToken;
    user.activeDeviceId = deviceId || user.activeDeviceId || `dev_${Date.now()}`;
    user.activeDeviceInfo = deviceInfo || 'Browser Device';
    user.lastActiveAt = now;
  }

  db.users[normEmail] = user;
  writeDb(db);

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
export function validateActiveSession({ email, sessionToken }) {
  const normEmail = normalizeEmail(email);
  if (!normEmail || !sessionToken) {
    return { valid: false, reason: 'MISSING_CREDENTIALS' };
  }

  const db = readDb();
  const user = db.users[normEmail];

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
  db.users[normEmail] = user;
  writeDb(db);

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
export function grantBooksToUser(email, name, bookIds = []) {
  const normEmail = normalizeEmail(email);
  const db = readDb();
  const user = db.users[normEmail];

  if (user) {
    const set = new Set([...(user.purchasedBooks || []), ...bookIds]);
    user.purchasedBooks = Array.from(set);
    if (name?.trim()) user.name = name.trim();
    db.users[normEmail] = user;
    writeDb(db);
    return user;
  } else {
    const res = registerOrUpdateUser({ email, name, booksToAdd: bookIds });
    return res.user;
  }
}
