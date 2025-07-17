import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGSRRJwQYwRsJNSgIWVlGTxskD8sGG10k",
  authDomain: "justoneclick-6dfc7.firebaseapp.com",
  projectId: "justoneclick-6dfc7",
  storageBucket: "justoneclick-6dfc7.appspot.com",
  messagingSenderId: "1052056204971",
  appId: "1:1052056204971:web:01fe7186c6d8faff0929ee",
  measurementId: "G-YHWPVGP3WF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ include this

export { db, auth };
