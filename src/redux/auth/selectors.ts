import type { StoreType } from "../store";

export const selectIsUserLoggedIn = (state: StoreType) =>
  state.auth.isAuthenticated;
