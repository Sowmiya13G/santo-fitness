import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  icon = null,
  iconPosition = "prefix",
  variant = "primary",
  customClassName=""
}) => {
  console.log('variant: ', variant);
  const isPrimary = variant === "primary";

  const baseStyles =
    "px-6 py-3 rounded-full font-semibold shadow-md w-full flex items-center justify-center gap-2 h-16 focus:outline-none focus:ring-0";

  const buttonClass = `${baseStyles} ${
    isPrimary ? "bg-primary-gradient" : "bg-white"
  } ${customClassName}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {icon && iconPosition === "prefix" && <span>{icon}</span>}
      <span className={`${isPrimary ? "text-white" : "text-gradient"}`}>
        {children}
      </span>
      {icon && iconPosition === "suffix" && <span>{icon}</span>}
    </button>
  );
};

export default Button;
