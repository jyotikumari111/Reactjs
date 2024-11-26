// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "foodie-a656a.firebaseapp.com",
  projectId: "foodie-a656a",
  storageBucket: "foodie-a656a.firebasestorage.app",
  messagingSenderId: "1039708809684",
  appId: "api id",
  measurementId: "G-4HWNWEVT60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); 
const firestore = getFirestore(app); 
const analytics = getAnalytics(app); 
export { auth, firestore };
