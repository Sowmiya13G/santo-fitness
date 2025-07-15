import React from "react";

const Button = ({
  label,
  onClick,
  type = "button",
  icon = null,
  iconPosition = "prefix",
  variant = "primary",
  customClassName = "",
  disabled = false,
  loading = false,
  iconColor = "text-white",
}) => {
  const isPrimary = variant === "primary";
  console.log("isPrimary: ", isPrimary);

  const baseStyles =
    "px-6 py-3 rounded-full font-semibold shadow-md w-full flex items-center justify-center gap-2 h-16 focus:outline-none hover:border-0 focus:ring-0 hover:outline-none active:outline-none transition-opacity duration-300";

  const buttonClass = `  ${customClassName} ${baseStyles} ${
    isPrimary ? "bg-primary-gradient" : "bg-white"
  } ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""} `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex items-center justify-center w-full h-full space-x-1">
          {[0, 1, 2].map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></span>
          ))}
        </span>
      ) : (
        <>
          {icon && iconPosition === "prefix" && (
            <span className={iconColor}>{icon}</span>
          )}
          <span className={isPrimary ? "text-white" : "text-gradient"}>
            {label}
          </span>
          {icon && iconPosition === "suffix" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
