import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  icon = null,
  iconPosition = "prefix",
  variant = "primary",
  customClassName = "",
  disabled = false,
  loading = false,
}) => {
  const isPrimary = variant === "primary";

  const baseStyles =
    "px-6 py-3 rounded-full font-semibold shadow-md w-full flex items-center justify-center gap-2 h-16 focus:outline-none hover:border-0 focus:ring-0 hover:outline-none active:outline-none transition-opacity duration-300";

  const buttonClass = `${baseStyles} ${
    isPrimary ? "bg-primary-gradient" : "bg-white"
  } ${
    disabled || loading ? "opacity-50 cursor-not-allowed" : ""
  } ${customClassName}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex items-center justify-center w-full h-full space-x-1">
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0s]"></span>
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </span>
      ) : (
        <>
          {icon && iconPosition === "prefix" && <span>{icon}</span>}
          <span className={`${isPrimary ? "text-white" : "text-gradient"}`}>
            {children}
          </span>
          {icon && iconPosition === "suffix" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
