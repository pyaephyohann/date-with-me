import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9Gx5HL7OTXt58VYibxe3z5KPpe1e3p_0",
  authDomain: "date-with-me-207ba.firebaseapp.com",
  projectId: "date-with-me-207ba",
  storageBucket: "date-with-me-207ba.firebasestorage.app",
  messagingSenderId: "495854603081",
  appId: "1:495854603081:web:bd533eaf0ea9b7d1e56898",
  measurementId: "G-3RLNW30MXY",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();
