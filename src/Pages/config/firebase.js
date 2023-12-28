import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBjZE1R5vxEYKPFN9O_abnuZP8kBfthpFo",
  authDomain: "newsxpress-9dca9.firebaseapp.com",
  projectId: "newsxpress-9dca9",
  storageBucket: "newsxpress-9dca9.appspot.com",
  messagingSenderId: "20111050902",
  appId: "1:20111050902:web:570730d5e1b44b829edab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)