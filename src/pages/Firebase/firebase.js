// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRwQo2o9SMNk0S1IqY3hQtvDkz1BVIl98",
  authDomain: "shopi-e-commerce-3eca8.firebaseapp.com",
  projectId: "shopi-e-commerce-3eca8",
  storageBucket: "shopi-e-commerce-3eca8.firebasestorage.app",
  messagingSenderId: "647570468838",
  appId: "1:647570468838:web:cb2262ee6928b341267027"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
