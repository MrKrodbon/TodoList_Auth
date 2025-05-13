import React from "react";
import RegistrationForm from "../../features/auth/RegistrationForm/RegistrationForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-around  bg-emerald-100 p-5 rounded-2xl w-96 h-96">
      <p className="text-3xl">Registration</p>
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
