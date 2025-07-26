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
  label,
  text,
  editable = true,
  suffixIconAction,
  isLoading = false,
}) => {
  console.log("inputClassName: ", inputClassName);
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

  const isInputDisabled = !editable || isLoading;

  return (
    <div className="w-full space-y-1">
      {label && <p className="text-base text-font_primary">{label}</p>}
      <div
        className={`flex items-center rounded-xl px-4 py-1 shadow-sm !bg-field_primary gap-2 w-full border ${baseBorder} ${wrapperClassName} ${
          isInputDisabled ? "opacity-60" : ""
        } ${isLoading ? "shimmer" : ""}`}
      >
        {icon && iconPosition === "prefix" && (
          <span className="text-icon">{icon}</span>
        )}
        <input
          type={inputType}
          placeholder={isLoading ? "" : placeholder}
          maxLength={maxLength}
          disabled={isInputDisabled}
          {...register(name)}
          value={isLoading ? "" : undefined}
          className={`flex-1 outline-none  text-font_primary w-full h-10 
          } ${inputClassName} ${isLoading ? "" : "!bg-field_primary"}`}
        />
        {type === "password" ? (
          <span
            className={`text-icon ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={isLoading ? undefined : toggleVisibility}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        ) : (
          <>
            {icon && iconPosition === "suffix" && (
              <button
                className="text-F7F8F8"
                onClick={isLoading ? undefined : suffixIconAction}
                disabled={isLoading}
              >
                {icon}
              </button>
            )}
            {text && <span className="text-sm text-icon">{text}</span>}
          </>
        )}
      </div>
      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}

      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            110deg,
            #f7f8f8 8%,
            #f7f8f8 18%,
            #f7f8f8 33%
          );
          background: #f7f8f8;
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Input;
