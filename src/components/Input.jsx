import React from "react";
import { useFormContext } from "react-hook-form";

const getInputPattern = (type) => {
  switch (type) {
    case "numeric":
      return "[0-9]*";
    case "alphanumeric":
      return "[A-Za-z0-9]*";
    case "email":
      return "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    case "password":
      return undefined; // Let rules handle password validation
    case "alphabetic":
    default:
      return "[A-Za-z]*";
  }
};

const Input = ({
  placeholder,
  name,
  type = "alphabetic",
  icon = null,
  iconPosition = "prefix",
  wrapperClassName = "",
  inputClassName = "",
  maxLength,
  rules = {}, // ✅ Accept rules prop
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const pattern = getInputPattern(type);
  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";

  return (
    <div className="w-full space-y-1">
      <div
        className={`flex items-center rounded-xl px-4 py-2 shadow-sm bg-feild_primay gap-2 w-full border ${baseBorder} ${wrapperClassName}`}
      >
        {icon && iconPosition === "prefix" && (
          <span className="text-icon">{icon}</span>
        )}
        <input
          type={type === "numeric" ? "text" : type}
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
          {...register(name, rules)} 
          className={`flex-1 outline-none text-font_primary bg-feild_primay w-full h-10 ${inputClassName}`}
        />
        {icon && iconPosition === "suffix" && (
          <span className="text-icon">{icon}</span>
        )}
      </div>
      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

export default Input;
