// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const signIn = () => signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);
export const onUser = (cb) => onAuthStateChanged(auth, cb);

// Firestore helpers
export const Scores = () => collection(db, "scores");
export const saveScore = (data) => addDoc(Scores(), { ...data, createdAt: serverTimestamp() });
export const scoresToday = async (yyyyMmDd) => {
  const q = query(Scores(), where("date", "==", yyyyMmDd));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
};
