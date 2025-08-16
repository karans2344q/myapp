import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// 🔹 Naya Firebase project ka config
const firebaseConfig = {
  apiKey: "AIzaSyAENaM0DH3kQkq2F_nyNbJtHvdXgVIo87E",
  authDomain: "justoneclick-db9e0.firebaseapp.com",
  projectId: "justoneclick-db9e0",
  storageBucket: "justoneclick-db9e0.firebasestorage.app",
  messagingSenderId: "471356671018",
  appId: "1:471356671018:web:5eabc06460e855a4b72f53",
  measurementId: "G-P7NJD7XKC2"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app); // Optional

export { db, auth };
