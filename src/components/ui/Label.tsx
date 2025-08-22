import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-raleway text-[#FFFFFF] sm:text-[21px] text-[16px] font-semibold block ${
        className || ""
      }`}
    >
      {children}
    </label>
  );
};

export default Label;
