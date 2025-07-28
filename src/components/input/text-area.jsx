import React from "react";
import { useFormContext } from "react-hook-form";

const Textarea = ({
  placeholder,
  name,
  label,
  maxLength,
  rows = 4,
  wrapperClassName = "",
  inputClassName = "",
  editable = true,
  isLoading = false,
  text,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";
  const isInputDisabled = !editable || isLoading;

  return (
    <div className="w-full space-y-1">
      {label && <p className="text-base text-font_primary">{label}</p>}
      <div
        className={`rounded-xl px-4 py-3 shadow-sm !bg-field_primary w-full border ${baseBorder} ${wrapperClassName} ${
          isInputDisabled ? "opacity-60" : ""
        } ${isLoading ? "shimmer" : ""}`}
      >
        <textarea
          placeholder={isLoading ? "" : placeholder}
          maxLength={maxLength}
          disabled={isInputDisabled}
          rows={rows}
          {...register(name)}
          className={`w-full outline-none resize-none bg-field_primary text-font_primary ${inputClassName}`}
        />
      </div>
      {text && <span className="text-sm text-icon">{text}</span>}
      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

export default Textarea;
