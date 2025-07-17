npm install swiper
npm install react-icons
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGSRRJwQYwRsJNSgIWVlGTxskD8sGG10k",
  authDomain: "justoneclick-6dfc7.firebaseapp.com",
  projectId: "justoneclick-6dfc7",
  storageBucket: "justoneclick-6dfc7.firebasestorage.app",
  messagingSenderId: "1052056204971",
  appId: "1:1052056204971:web:01fe7186c6d8faff0929ee",
  measurementId: "G-YHWPVGP3WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import { db } from './firebase';
