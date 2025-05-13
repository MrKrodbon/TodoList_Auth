import React from "react";
import LoginForm from "../../features/auth/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-around bg-emerald-100 p-5 rounded-2xl w-96 h-96">
      <p className="text-3xl">Log in</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
