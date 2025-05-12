import React from "react";
import type { LabelProps } from "../../types";

const Label = ({ value, children, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor}>
      {value && <span className="mr-2.5">{value}</span>}
      {children}
    </label>
  );
};

export default Label;
