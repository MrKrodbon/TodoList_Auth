import React from "react";
import type { ButtonProps } from "../../types";

const Button = ({ type, onClick, value, icon }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick}>
      {value || icon}
    </button>
  );
};

export default Button;
