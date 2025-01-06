// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC90S-P1CuYNYByaO05JF9PpuXMMvtQ6DM",
  authDomain: "sound-nation-api.firebaseapp.com",
  projectId: "sound-nation-api",
  storageBucket: "sound-nation-api.firebasestorage.app",
  messagingSenderId: "469945674462",
  appId: "1:469945674462:web:baf8c1e981b91946a5f04f",
  measurementId: "G-PC50MHYS9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);