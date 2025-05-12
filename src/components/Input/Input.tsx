import React from "react";
import type { InputProps } from "../../types";

const Input = ({
  id,
  type,
  onChange,
  onBlur,
  value,
  name,
  placeholder,
}: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      placeholder={placeholder}
      className="w-48 p-2 rounded-2xl bg-gray-50"
    />
  );
};

export default Input;
