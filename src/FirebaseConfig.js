// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnU_u-5N0YNy8R857_OoreEddtvEcuCO0",
  authDomain: "h-delivery-a023d.firebaseapp.com",
  projectId: "h-delivery-a023d",
  storageBucket: "h-delivery-a023d.appspot.com",
  messagingSenderId: "853947028469",
  appId: "1:853947028469:web:c9bf943f0726cfe1dac6bc",
  measurementId: "G-ZKR0MQ11DX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);