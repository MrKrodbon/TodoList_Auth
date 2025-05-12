// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import type {
  userSignInProps,
  userSignUpProps,
  userSignupProps,
} from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7NpRN1k93IWxkgfvEXUSXC2wnFSmosSk",
  authDomain: "todo-list-e39a9.firebaseapp.com",
  projectId: "todo-list-e39a9",
  storageBucket: "todo-list-e39a9.firebasestorage.app",
  messagingSenderId: "817765651853",
  appId: "1:817765651853:web:4324febb12f38f8e6919c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const userSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, email, password }: userSignUpProps, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch(
        (error) => thunkAPI.rejectWithValue(error)
      );

      await updateProfile(auth.currentUser, { displayName: name }).catch(
        (error) => thunkAPI.rejectWithValue(error)
      );

      const idToken = await auth.currentUser?.getIdToken();

      alert("account successfully crated");
      return { token: idToken, user: { name } };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSignIn = createAsyncThunk(
  "user/signIn",
  async ({ email, password }: userSignInProps, thunkAPI) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => alert("sign in successfully"))
        .catch((error) => thunkAPI.rejectWithValue(error));

      const token = await auth.currentUser?.getIdToken();
      return {
        token,
        user: {
          name: auth.currentUser?.displayName || "",
        },
      };
    } catch (error) {
      alert(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
