import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Define the config from environment variables first (Netlify/Vercel standard)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || '(default)'
};

// Check if we have the minimal required config
const hasConfig = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

// Initialize app selectively
let app;
if (hasConfig) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} else {
  console.warn("Firebase configuration is missing. If you're on Netlify, please set the VITE_FIREBASE_* environment variables.");
  // Provide a dummy app or we'll crash later. 
  // In AI Studio, we'll try to load the local file dynamically if possible, 
  // but for now let's use placeholders to avoid crashes during early boot.
  app = getApps().length === 0 ? initializeApp({
    apiKey: "placeholder",
    authDomain: "placeholder",
    projectId: "placeholder",
    storageBucket: "placeholder",
    messagingSenderId: "placeholder",
    appId: "placeholder"
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
