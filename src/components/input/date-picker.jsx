import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";
import { FiCalendar } from "react-icons/fi";

const InputDatePicker = ({
  placeholder = "Select date",
  name,
  label,
  wrapperClassName = "",
  inputClassName = "",
  editable = true,
  minDate,
  maxDate,
  isLoading = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const dateInputRef = useRef(null);
  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";
  const isInputDisabled = !editable || isLoading;

  return (
    <div className="w-full space-y-1">
      {label && <p className="text-base text-font_primary">{label}</p>}

      <div
        className={`relative flex items-center rounded-xl px-4 py-1 shadow-sm bg-field_primary w-full border ${baseBorder} ${wrapperClassName} ${
          isInputDisabled ? "opacity-60" : ""
        } ${isLoading ? "shimmer" : ""}`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText={isLoading ? "" : placeholder}
              selected={field.value}
              onChange={(date) => !isLoading && field.onChange(date)}
              className={`w-full pr-10 outline-none text-font_primary bg-field_primary  h-10 ${
                isInputDisabled ? "cursor-not-allowed" : ""
              } ${inputClassName}`}
              dateFormat="yyyy-MM-dd"
              popperPlacement="bottom-start"
              ref={dateInputRef}
              minDate={minDate}
              maxDate={maxDate}
              disabled={isInputDisabled}
              dayClassName={(date) =>
                field.value &&
                date.toDateString() === field.value.toDateString()
                  ? "bg-primary-gradient text-white rounded-full"
                  : ""
              }
            />
          )}
        />

        <button
          type="button"
          onClick={() => !isInputDisabled && dateInputRef.current.setFocus()}
          className={`absolute right-4 text-icon ${
            isInputDisabled ? "cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          <FiCalendar className="w-5 h-5" />
        </button>
      </div>

      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}

      {/* Shimmer CSS */}
      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            110deg,
            #e0e0e0 8%,
            #f0f0f0 18%,
            #e0e0e0 33%
          );
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

export default InputDatePicker;
