import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  placeholder,
  name,
  type = "alphabetic",
  icon = null,
  iconPosition = "prefix",
  wrapperClassName = "",
  inputClassName = "",
  maxLength,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type === "numeric"
      ? "text"
      : type;

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full space-y-1">
      <div
        className={`flex items-center rounded-xl px-4 py-2 shadow-sm bg-feild_primay gap-2 w-full border ${baseBorder} ${wrapperClassName}`}
      >
        {icon && iconPosition === "prefix" && (
          <span className="text-icon">{icon}</span>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          maxLength={maxLength}
          {...register(name)}
          className={`flex-1 outline-none text-font_primary bg-feild_primay w-full h-10 ${inputClassName}`}
        />

        {type === "password" ? (
          <span className="text-icon cursor-pointer" onClick={toggleVisibility}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        ) : (
          icon &&
          iconPosition === "suffix" && <span className="text-icon">{icon}</span>
        )}
      </div>

      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

export default Input;
