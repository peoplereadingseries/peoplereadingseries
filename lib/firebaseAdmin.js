import admin from 'firebase-admin';

// Initialize Firebase Admin SDK for Server Routes
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Parse JSON from environment variable
      const serviceAccount = typeof process.env.FIREBASE_SERVICE_ACCOUNT_KEY === 'string'
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        : process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'peoplereadingseries-ac84c',
      });
    } else {
      // Initialize with project ID (works with Google Cloud ADC or direct Firestore operations)
      admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'peoplereadingseries-ac84c',
      });
    }
  } catch (err) {
    console.warn('Firebase Admin initialization notice:', err.message);
  }
}

let adminDb = null;
try {
  if (admin.apps.length > 0) {
    adminDb = admin.firestore();
  }
} catch (e) {
  console.warn('Firebase Admin Firestore notice:', e.message);
}

export { admin, adminDb };
