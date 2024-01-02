// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR9U0y4cX3HX_WQIyBMYMrLJGyQBNXMEQ",
  authDomain: "h-delivery-dc984.firebaseapp.com",
  projectId: "h-delivery-dc984",
  storageBucket: "h-delivery-dc984.appspot.com",
  messagingSenderId: "532318679045",
  appId: "1:532318679045:web:4557ed176c0b75fdfc6c6c",
  measurementId: "G-Z15958GHJJ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth"
// import "firebase/compat/firestore"

// const firebaseConfig = {
//   apiKey: "AIzaSyBR9U0y4cX3HX_WQIyBMYMrLJGyQBNXMEQ",
//   authDomain: "h-delivery-dc984.firebaseapp.com",
//   projectId: "h-delivery-dc984",
//   storageBucket: "h-delivery-dc984.appspot.com",
//   messagingSenderId: "532318679045",
//   appId: "1:532318679045:web:4557ed176c0b75fdfc6c6c",
//   measurementId: "G-Z15958GHJJ"
// }

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export { firebase };