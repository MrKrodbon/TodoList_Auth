import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { TodoGroup, TodoState } from "../../types";
import {
  fetchTodosFromFirebase,
  submitTodo,
  deleteTodo,
  deleteGroup,
} from "./operations";

const initialState: TodoState = {
  todos: [],
  error: null,
  loading: false,
};

const todoGroupSlice = createSlice({
  name: "todoGroup",
  initialState,
  reducers: {
    // deleteGroup: (state, action) => {
    //   return state.todos.filter((group) => group.id !== action.payload);
    // },

    toggleTodo: (state, action) => {
      for (const group of state) {
        const todo = group.todos.find((todo) => todo.id === action.payload);
        if (todo) {
          todo.isCompleted = !todo.isCompleted;
          break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTodo.fulfilled, (state, action) => {
        const { title, todos } = action.payload;
        const existingGroup = state.todos.find(
          (group) => group.title === title
        );

        if (existingGroup) {
          existingGroup.todos.push(...todos);
        } else {
          state.todos.push({
            id: nanoid(),
            title,
            todos,
          });
        }
        state.loading = false;
      })
      .addCase(submitTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error with adding todo";
      })
      .addCase(fetchTodosFromFirebase.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodosFromFirebase.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodosFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error with fetching todos";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const { groupId, todoId } = action.payload;

        const group = state.todos.find((group) => group.id === groupId);

        if (group) {
          group.todos = group.todos.filter((todo) => todo.id !== todoId);
        }
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message || "Error with delete todo";
        state.loading = false;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        const groupId = action.payload;

        state.todos = state.todos.filter((group) => group.id !== groupId);
      });
  },
});

export const { toggleTodo } = todoGroupSlice.actions;
export default todoGroupSlice.reducer;
