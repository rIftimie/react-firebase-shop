// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzGK7rllE9Og6wGPFRGr-VDgRZTHqcr-I",
  authDomain: "tiendainformatica-e2662.firebaseapp.com",
  projectId: "tiendainformatica-e2662",
  storageBucket: "tiendainformatica-e2662.appspot.com",
  messagingSenderId: "35554588735",
  appId: "1:35554588735:web:bc7fc4ef4704ec4d1fa08a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
