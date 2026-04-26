import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Define the config from environment variables first (Netlify/Vercel standard)
let firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || '(default)'
};

// Fallback for AI Studio environment if env vars aren't set
// We use a conditional check to avoid build errors if the file is missing in production
import firebaseConfigLocal from '../../firebase-applet-config.json';

// Check if we have the minimal required config
console.log("Firebase Init: VITE_API_KEY present:", !!import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Firebase Init: Local API_KEY present:", !!firebaseConfigLocal?.apiKey);

console.log("Firebase Init Debug: import.meta.env.VITE_API_KEY =", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Firebase Init Debug: local config API_KEY =", firebaseConfigLocal?.apiKey);

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.toLowerCase() === 'placeholder') {
  if (firebaseConfigLocal && firebaseConfigLocal.apiKey && firebaseConfigLocal.apiKey.toLowerCase() !== 'placeholder') {
    console.log("Firebase Init: Using local config fallback");
    firebaseConfig = {
      apiKey: firebaseConfigLocal.apiKey,
      authDomain: firebaseConfigLocal.authDomain,
      projectId: firebaseConfigLocal.projectId,
      storageBucket: firebaseConfigLocal.storageBucket,
      messagingSenderId: firebaseConfigLocal.messagingSenderId,
      appId: firebaseConfigLocal.appId,
      firestoreDatabaseId: firebaseConfigLocal.firestoreDatabaseId || '(default)'
    };
  }
}

console.log("Firebase Init Debug: Final API_KEY =", firebaseConfig.apiKey);
const hasConfig = !!firebaseConfig.apiKey && firebaseConfig.apiKey.toLowerCase() !== 'placeholder' && !firebaseConfig.apiKey.includes('PLACEHOLDER');
console.log("Firebase Init Debug: hasConfig =", hasConfig);

// Initialize app selectively
let app;
if (hasConfig) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} else {
  console.warn("Firebase configuration is missing. If you're on Netlify, please set the VITE_FIREBASE_* environment variables.");
  // Provide a dummy app or we'll crash later.
  app = getApps().length === 0 ? initializeApp({
    apiKey: "AIza-placeholder-key-for-initial-load", // Needs to be a valid-ish pattern for some SDK parts
    authDomain: "placeholder.firebaseapp.com",
    projectId: "placeholder-project",
    storageBucket: "placeholder.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
  }) : getApp();
}

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId === '(default)' ? undefined : firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity Test
async function testConnection() {
  if (!hasConfig) return;
  try {
    console.log("Checking Firebase connection with Project ID:", firebaseConfig.projectId);
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection established successfully.");
  } catch (error: any) {
    console.error("Firebase Connection Error:", error);
    if (error?.message?.includes('offline') || error?.message?.includes('network')) {
      console.error("Firebase is offline or network is unreachable. Check your configuration and internet connection.");
    } else if (error?.code === 'permission-denied') {
      console.log("Firebase is online (reached server, but access denied to 'test' collection - this is expected).");
    }
  }
}
testConnection();
