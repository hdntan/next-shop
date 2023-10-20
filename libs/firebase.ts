// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMxahcBSFNeai29Vze7K3V0aP6HeSQR8k",
  authDomain: "next-shop-28e3f.firebaseapp.com",
  projectId: "next-shop-28e3f",
  storageBucket: "next-shop-28e3f.appspot.com",
  messagingSenderId: "439303741514",
  appId: "1:439303741514:web:2929ffca3e1687257806b3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp