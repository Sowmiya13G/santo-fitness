import React from "react";

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "bg-white px-6 py-3 rounded-full font-semibold shadow-md w-full"
      }
    >
      <span className={"text-gradient"}>{children}</span>
    </button>
  );
};

export default Button;
