import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, auth, provider;

try {
  // Only initialize if config is present, to prevent immediate crashes for users without keys
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_firebase_api_key') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
  } else {
    console.warn("Firebase config is missing or using default placeholders. Auth features will use a mock bypass if configured.");
  }
} catch (error) {
  console.error("Firebase initialization error", error);
}

export const loginWithGoogle = async () => {
  if (!auth) {
    console.warn("Using mock login because Firebase is not configured.");
    return { user: { displayName: 'Guest User', email: 'guest@example.com' }, token: 'mock' };
  }
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  return { user: result.user, token };
};

export const logout = async () => {
  if (auth) {
    await signOut(auth);
  }
};

export { auth };
