import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, fireBaseAuth } from "../../services/api";
import type { userSignInProps, userSignUpProps } from "../../types";

export const userSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, email, password }: userSignUpProps, thunkAPI) => {
    try {
      await fireBaseAuth
        .createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => thunkAPI.rejectWithValue(error));

      await fireBaseAuth
        .updateProfile(auth.currentUser, {
          displayName: name,
        })
        .catch((error) => thunkAPI.rejectWithValue(error));

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
      fireBaseAuth
        .signInWithEmailAndPassword(auth, email, password)
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
