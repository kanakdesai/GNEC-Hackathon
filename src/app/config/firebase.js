
import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyABdPrvsPiPd54T8m_ihxyybEuHBGBCvuo",
  authDomain: "hackathon-database-48e6b.firebaseapp.com",
  projectId: "hackathon-database-48e6b",
  storageBucket: "hackathon-database-48e6b.appspot.com",
  messagingSenderId: "330971427669",
  appId: "1:330971427669:web:0e401ac2390f58f46635dc"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


