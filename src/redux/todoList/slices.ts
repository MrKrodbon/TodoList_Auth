import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../types";

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // addTodo: {
    //   reducer(state, action: PayloadAction<Todo>) {
    //     state.push(action.payload);
    //   },
    //   prepare(title: string, description: string) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         description,
    //         isCompleted: false,
    //       },
    //     };
    //   },
    // },
    deleteTodo: (state, action: PayloadAction<Todo>) => {
      return state.filter((todo: Todo) => todo.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        if (todo.title !== undefined) {
          todo.title = action.payload.title;
        }
        if (todo.description !== undefined) {
          todo.description = action.payload.description;
        }
      }
    },
    toggleTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.find((todo: Todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
  },
});

export const { deleteTodo, editTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
