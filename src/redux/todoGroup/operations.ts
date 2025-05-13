import { collection, doc, getDocs } from "@firebase/firestore";
import { db, fireBaseDbWork } from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Todo, TodoGroup } from "../../types";

export const submitTodo = createAsyncThunk(
  "todos/AddTodos",
  async ({ title, todos }: TodoGroup, thunkAPI) => {
    try {
      const newGroupRef = await fireBaseDbWork
        .addDoc(collection(db, "todos"), {
          title,
          todos,
        })
        .catch((error) => thunkAPI.rejectWithValue(error));

      return { id: newGroupRef.id, title, todos };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/DeleteTodo",
  async (
    { groupId, todoId }: { groupId: string; todoId: string },
    thunkAPI
  ) => {
    try {
      const groupRef = doc(db, "todos", groupId);
      const groupSnap = await fireBaseDbWork.getDoc(groupRef);

      if (!groupSnap.exists()) {
        return thunkAPI.rejectWithValue("Group not found");
      }

      const groupData = groupSnap.data();
      const updatedTodos = groupData.todos.filter(
        (todo: Todo) => todo.id !== todoId
      );

      // оновити документ
      await fireBaseDbWork.updateDoc(groupRef, {
        ...groupData,
        todos: updatedTodos,
      });

      return { groupId, todoId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "todos/deleteGroup",
  async (groupId: string, thunkAPI) => {
    try {
      await fireBaseDbWork
        .deleteDoc(doc(db, "todos", groupId))
        .catch((error) => {
          alert(`You don't have permisson to delete group`);
          return;
        });
      return groupId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/UpdateTodo",
  async (
    {
      id,
      title,
      todos,
    }: { id: string; title: string; todos: TodoGroup["todos"] },
    thunkAPI
  ) => {
    try {
      await fireBaseDbWork.updateDoc(doc(db, "todos", id), {
        title,
        todos,
      });

      return { id, title, todos };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchTodosFromFirebase = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "todos"));
      const todos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
