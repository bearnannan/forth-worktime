import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDj_9ps_wx9SAHfNy1xMXpM_ukliwm6q30",
    authDomain: "forth-worktime-app.firebaseapp.com",
    projectId: "forth-worktime-app",
    storageBucket: "forth-worktime-app.firebasestorage.app",
    messagingSenderId: "248890234668",
    appId: "1:248890234668:web:addb07c0abe6e6e371fe89",
    measurementId: "G-K2H2JMHTJK"
};

// Initialize Firebase (Singleton)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics = null;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, analytics };
