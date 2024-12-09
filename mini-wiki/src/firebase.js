import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQwlf6YVe3Y4yhzGmHAqWvfeFxHSBD4qY",
    authDomain: "mini-wiki-41264.firebaseapp.com",
    projectId: "mini-wiki-41264",
    storageBucket: "mini-wiki-41264.firebasestorage.app",
    messagingSenderId: "504379580526",
    appId: "1:504379580526:web:76391fc08036e8bdb3067f",
    measurementId: "G-R14G7S71P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider()

export { app, auth, provider, db };