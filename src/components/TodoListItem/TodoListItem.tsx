import React, { useState } from "react";
import type { TodoProps } from "../../types";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../../redux/todoList/slices";

const TodoListItem = ({ todo }: TodoProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const onDeleteHandle = () => {
    dispatch(deleteTodo(todo));
    setIsEditing(false);
  };

  const onSaveHandle = () => {
    dispatch(
      editTodo({
        ...todo,
        title: editedTitle,
        description: editedDescription,
      })
    );
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2 rounded-xl shadow-md bg-white hover:bg-gray-100 transition">
      {isEditing ? (
        <div className="flex flex-col sm:flex-row gap-2 flex-grow">
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <Input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 flex-grow">
          <p className="text-gray-800 font-medium">{todo.title}</p>
          <p className="text-gray-600">{todo.description}</p>
          <input
            id="isCompleted"
            type="checkbox"
            checked={todo.isCompleted}
            onClick={() => {
              dispatch(toggleTodo(todo));
            }}
          />
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            value="Edit"
          />
          <Button type="button" onClick={onDeleteHandle} value="Delete" />
        </div>
      )}

      <div className="flex gap-2 items-center">
        {isEditing && (
          <>
            <input
              id="isCompleted"
              type="checkbox"
              checked={todo.isCompleted}
              onClick={() => {
                dispatch(toggleTodo(todo));
              }}
            />
            <Button type="button" onClick={onSaveHandle} value="Save" />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoListItem;
