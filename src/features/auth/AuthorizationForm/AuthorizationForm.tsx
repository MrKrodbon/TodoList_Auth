import { Formik } from "formik";
import React from "react";
import Label from "../../../components/Label/Label";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import type { userSignInProps } from "../../../types";
import { userSignIn } from "../../../redux/auth/operations";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const AuthorizationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const onSubmitHandle = (values: userSignInProps) => {
    const trimmedValues = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    dispatch(userSignIn(trimmedValues));
    navigation("/");
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandle}>
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          className="flex flex-col gap-2.5 w-full h-full items-center"
        >
          <Label value="Email" htmlFor="email">
            <Input
              id="email"
              type="text"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.email}
              name="email"
              placeholder="Enter your email"
            />
          </Label>
          <Label value="Password" htmlFor="password">
            <Input
              id="password"
              type="password"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.password}
              name="password"
              placeholder="Enter your password"
            />
          </Label>
          <Button type="submit" value="Log in" />
        </form>
      )}
    </Formik>
  );
};

export default AuthorizationForm;
