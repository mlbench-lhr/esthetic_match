import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";

interface InputProps {
  id: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  withIcon?: boolean;
  readOnly?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type = "text",
      value,
      onChange,
      placeholder,
      className,
      withIcon = false,
      readOnly = false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const finalType = isPassword && showPassword ? "text" : type;

    return (
      <div className="relative w-full max-w-[416px]">
        <input
          ref={ref}
          id={id}
          name={name}
          type={finalType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={(e) => e.target.removeAttribute("readonly")}
          className={`mt-1 block w-full px-4 py-3 border shadow-sm outline-none focus:outline-none pr-10 ${
            className || ""
          } ${
            isPassword ? "h-11 md:h-11" : "h-11 md:h-11"
          } text-[12px] md:text-[14px]`}
        />

        {withIcon && isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="top-1/2 right-3 absolute text-gray-500 -translate-y-1/2"
            tabIndex={-1}
          >
            {showPassword ? (
              <IoMdEye className="text-[#00000080]" size={20} />
            ) : (
              <LuEyeClosed className="text-[#00000080]" size={20} />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
