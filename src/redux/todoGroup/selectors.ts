import type { StoreType } from "../store";

export const selectToDoGroupList = (state: StoreType) => state.todoGroup;

export const selectToDo = (state: StoreType) =>
  state.todoGroup.todos.map((todo) => todo.todos);

export const selectToDoGroupId = (state: StoreType) =>
  state.todoGroup.todos.find((group) => group);
