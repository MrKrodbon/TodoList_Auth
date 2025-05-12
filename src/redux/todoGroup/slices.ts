import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { TodoGroup, Todo } from "../../types";

const initialState: TodoGroup[] = [];

const todoGroupSlice = createSlice({
  name: "todoGroup",
  initialState,
  reducers: {
    addGroup: {
      reducer(state, action: PayloadAction<TodoGroup>) {
        const { title, todo } = action.payload;
        const existingGroup = state.find((group) => group.title === title);
        if (existingGroup) {
          existingGroup.todo.push(todo);
        } else {
          state.push({
            id: nanoid(),
            title,
            todo: todo,
          });
        }
      },
      prepare(title: string, todo: Todo[]) {
        return {
          payload: { title, todo },
        };
      },
    },
    deleteGroup: (state, action) => {
      state.filter((group) => group.id !== action.payload.id);
    },
  },
});

export const { addGroup, deleteGroup } = todoGroupSlice.actions;
export default todoGroupSlice.reducer;
