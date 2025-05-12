import { Formik } from "formik";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Label from "../../../components/Label/Label";
import type { userSignUpProps } from "../../../types";
import { userSignUp } from "../../../redux/auth/operations";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const onSubmitHandle = (values: userSignUpProps) => {
    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };
    dispatch(userSignUp(trimmedValues));
    navigation("/");
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandle}>
      {(props) => (
        <form className="flex flex-col gap-2.5 w-full h-full items-center">
          <Label value="Name" htmlFor="name">
            <Input
              id="name"
              type="text"
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              value={props.values.name}
              name="name"
              placeholder="name"
            />
          </Label>
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
          <Button type="submit" value="Register" />
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
