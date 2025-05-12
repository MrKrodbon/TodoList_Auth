import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";
import { userSignIn, userSignUp } from "./operations";

const initialState: AuthState = {
  token: "",
  user: null,
  isAuthenticated: !!localStorage.getItem("firebaseToken"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("firebaseToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.token = action.payload.token;
        }

        state.user = action.payload.user;

        state.isAuthenticated = true;
        if (state.token) {
          localStorage.setItem("firebaseToken", state.token);
        }
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        if (action.payload.token) {
          localStorage.setItem("firebaseToken", state.token);
        }
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
