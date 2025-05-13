import React, { useEffect } from "react";
import { Formik, type FormikHelpers } from "formik";
import ToDoList from "../../components/ToDoList/ToDoList";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { selectToDoGroupList } from "../../redux/todoGroup/selectors";
import {
  deleteGroup,
  fetchTodosFromFirebase,
  submitTodo,
} from "../../redux/todoGroup/operations";
import type { AppDispatch } from "../../redux/store";

const initialValues = {
  title: "",
  description: "",
  taskGroupTitle: "",
};

export const TodoForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchTodosData = async () => {
    await dispatch(fetchTodosFromFirebase());
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  const toDoGroupList = useSelector(selectToDoGroupList);

  const onSubmitHandle = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    const todo = {
      id: nanoid(),
      title: values.title.trim(),
      description: values.description.trim(),
      isCompleted: false,
    };

    if (!values.taskGroupTitle.trim()) {
      return;
    }

    await dispatch(
      submitTodo({ title: values.taskGroupTitle.trim(), todos: [todo] })
    );

    actions.resetForm();
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 px-4 py-2 rounded-xl shadow-md bg-gray-400  w-full h-full ">
      <Formik initialValues={initialValues} onSubmit={onSubmitHandle}>
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="flex flex-col gap-2.5 w-full h-full items-center"
          >
            <Label value="Group title" htmlFor="groupTitle" />
            <Input
              id="taskGroupTitle"
              type="text"
              name="taskGroupTitle"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.taskGroupTitle}
              placeholder="Enter group title"
            />

            <Label value="Task title" htmlFor="title" />
            <Input
              id="title"
              type="text"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.title}
              name="title"
              placeholder="Enter title"
            />
            <Label value="Description" htmlFor="description" />
            <Input
              id="description"
              type="text"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.description}
              name="description"
              placeholder="Enter description"
            />
            <Button type="submit" value="Add" />
          </form>
        )}
      </Formik>
      {toDoGroupList.todos.length > 0 &&
        toDoGroupList.todos.map((group) => (
          <div
            key={group.id}
            className="w-full bg-white p-4 rounded shadow-md mt-4"
          >
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-bold">{group.title}</h2>
              <Button
                type="button"
                value="delete"
                onClick={() => dispatch(deleteGroup(group.id))}
              />
            </div>
            {group.todos && <ToDoList todos={group.todos} />}
          </div>
        ))}
    </div>
  );
};
