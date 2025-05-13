import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7NpRN1k93IWxkgfvEXUSXC2wnFSmosSk",
  authDomain: "todo-list-e39a9.firebaseapp.com",
  projectId: "todo-list-e39a9",
  storageBucket: "todo-list-e39a9.firebasestorage.app",
  messagingSenderId: "817765651853",
  appId: "1:817765651853:web:4324febb12f38f8e6919c4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireBaseAuth = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
};

export const db = getFirestore(app);
export const fireBaseDbWork = {
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  collection,
};
