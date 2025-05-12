import React from "react";
import TodoList from "../../components/TodoList/TodoList";
import { Formik, type FormikHelpers } from "formik";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, deleteGroup } from "../../redux/todoGroup/slices";
import { selectTodoGroupList } from "../../redux/todoGroup/selectors";
import { nanoid } from "@reduxjs/toolkit";

const initialValues = {
  title: "",
  description: "",
  taskGroupTitle: "",
};

const HomePage = () => {
  const dispatch = useDispatch();
  const toDoGroupList = useSelector(selectTodoGroupList);

  const onSubmitHandle = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    if (values.taskGroupTitle.length && values.title.length) {
      dispatch(
        addGroup(values.taskGroupTitle.trim(), {
          id: nanoid(),
          title: values.title.trim(),
          description: values.description.trim(),
        })
      );
      actions.resetForm();
    }
    actions.resetForm();
  };

  const onDeleteHandle = () => {
    dispatch(deleteGroup(toDoGroupList));
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
      {toDoGroupList.map((group) => (
        <div
          key={group.id}
          className="w-full bg-white p-4 rounded shadow-md mt-4"
        >
          <div className="flex felx-row justify-between">
            <h2 className="text-lg font-bold">{group.title}</h2>
            <Button type="button" value="delete" onClick={onDeleteHandle} />
          </div>
          <TodoList />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
