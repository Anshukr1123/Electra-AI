const admin = require('firebase-admin');

// You should initialize this with your service account.
// For this MVP, we assume the environment variables are set.
// If testing locally without setting up the full admin SDK, we might mock this out.

try {
  // Try initializing with env vars if they exist
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin initialized');
  } else {
    // Fallback for local dev if no keys are provided (will fail on auth but allows server to start)
    console.warn('Missing Firebase Admin environment variables. Auth will fail.');
  }
} catch (error) {
  console.error('Firebase admin initialization error', error);
}

module.exports = admin;
