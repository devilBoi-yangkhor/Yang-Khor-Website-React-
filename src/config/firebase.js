import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // For Firestore
import { getStorage } from 'firebase/storage'; // For Storage

const firebaseConfig = {
    apiKey: "AIzaSyDGH7k_HcHVHRe6MOD7d00KfE0UPui19u8",
    authDomain: "yang-khor-website.firebaseapp.com",
    projectId: "yang-khor-website",
    storageBucket: "yang-khor-website.appspot.com",
    messagingSenderId: "1086785362011",
    appId: "1:1086785362011:web:e07db79d0c1003ae06c77e",
    measurementId: "G-HH5KEY079P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const firestoreDb = getFirestore(app); // Correctly initializing Firestore

// Initialize Storage
export const storage = getStorage(app); // Storage can be used for file uploads
