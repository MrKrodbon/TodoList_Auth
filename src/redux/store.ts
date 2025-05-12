import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slices";
import todoReducer from "./todoList/slices";
import todoGroupReducer from "./todoGroup/slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    todoGroup: todoGroupReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type StoreType = ReturnType<typeof store.getState>;
