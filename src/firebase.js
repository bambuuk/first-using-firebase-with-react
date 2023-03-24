import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCC1-uGoc_FWH_Ky-IcPhh_YBbzADIxLRE",
  authDomain: "fb-crud-de703.firebaseapp.com",
  projectId: "fb-crud-de703",
  storageBucket: "fb-crud-de703.appspot.com",
  messagingSenderId: "388674743933",
  appId: "1:388674743933:web:898dc63157699658c70b14",
  measurementId: "G-YTLVTR5JCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
