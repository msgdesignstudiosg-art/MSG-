import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Define the config from environment variables first (Netlify/Vercel standard)
export let firebaseConfig: any = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || '(default)'
};
      // Ignore error if file is missing (expected in production)
 

// Check if we have the minimal required config
export const isConfigValid = (config: any) => 
  !!config && 
  !!config.apiKey && 
  config.apiKey.toLowerCase() !== 'placeholder' && 
  !config.apiKey.includes('PLACEHOLDER') &&
  config.apiKey !== 'AIza-placeholder-key-for-initial-load';

// Initialize app selectively
let app: any;

if (isConfigValid(firebaseConfig)) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  } catch (err) {
    console.error("Firebase init error:", err);
    app = getApps().length === 0 ? initializeApp({
      apiKey: "AIza-placeholder-key-for-initial-load",
      authDomain: "placeholder.firebaseapp.com",
      projectId: "placeholder-project",
      storageBucket: "placeholder.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef"
    }) : getApp();
  }
} else {
  app = getApps().length === 0 ? initializeApp({
    apiKey: "AIza-placeholder-key-for-initial-load",
    authDomain: "placeholder.firebaseapp.com",
    projectId: "placeholder-project",
    storageBucket: "placeholder.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
  }) : getApp();
}

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId === '(default)' ? undefined : firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Attempt to reload config and re-initialize if we were using placeholders
// This is mainly for the AI Studio preview environment
loadLocalConfig().then((loaded) => {
  if (loaded && isConfigValid(firebaseConfig)) {
    // Note: In most cases, if we're here, we already initialized with a placeholder.
    // Re-initializing might not be fully supported by all SDK parts easily without refresh,
    // but at least the config object will be updated for future calls if something uses it.
    console.log("Firebase config updated from local fallback.");
  }
});

// Connectivity Test
async function testConnection() {
  if (!isConfigValid(firebaseConfig)) return;
  try {
    console.log("Checking Firebase connection with Project ID:", firebaseConfig.projectId);
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection established successfully.");
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      console.log("Firebase Connection: Online (Access to 'test' restricted by security rules).");
      return;
    }
    
    console.error("Firebase Connection Error:", error);
    if (error?.message?.includes('offline') || error?.message?.includes('network')) {
      console.error("Firebase is offline or network is unreachable. Check your configuration and internet connection.");
    }
  }
}
testConnection();
