import React, { useState } from "react";
import type { TodoProps } from "../../types";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "../../redux/todoGroup/slices";
import { deleteTodo, updateTodo } from "../../redux/todoGroup/operations";
import { AppDispatch, type StoreType } from "../../redux/store";
import { selectToDoGroupId } from "../../redux/todoGroup/selectors";

const ToDoListItem = ({ id, title, description, isCompleted }: TodoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const groupId = useSelector(selectToDoGroupId);

  const onDeleteHandle = () => {
    dispatch(deleteTodo({ groupId: groupId?.id, todoId: id }));
    setIsEditing(false);
  };

  const onSaveHandle = () => {
    dispatch(
      updateTodo({
        id,
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
          <p className="text-gray-800 font-medium">{title}</p>
          <p className="text-gray-600">{description}</p>
          <input
            id="isCompleted"
            type="checkbox"
            checked={isCompleted}
            onChange={() => {
              dispatch(toggleTodo(id));
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
              checked={isCompleted}
              onChange={() => {
                dispatch(toggleTodo(id));
              }}
            />
            <Button type="button" onClick={onSaveHandle} value="Save" />
          </>
        )}
      </div>
    </li>
  );
};

export default ToDoListItem;
