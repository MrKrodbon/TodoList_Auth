import type { StoreType } from "../store";

export const selectTodoList = (state: StoreType) => state.todo;
