import React from "react";

const getInputPattern = (type) => {
  switch (type) {
    case "numeric":
      return "[0-9]*";
    case "alphanumeric":
      return "[A-Za-z0-9]*";
    case "email":
    case "password":
      return "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    case "alphabetic":
    default:
      return "[A-Za-z]*";
  }
};

const Input = ({
  placeholder,
  value,
  onChange,
  type = "alphabetic",
  icon = null,
  iconPosition = "prefix",
  wrapperClassName = "",
  inputClassName = "",
  maxLength,
  error = "",
}) => {
  const pattern = getInputPattern(type);

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
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          pattern={pattern}
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
