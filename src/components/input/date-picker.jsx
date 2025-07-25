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
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const dateInputRef = useRef(null);
  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";

  return (
    <div className="w-full space-y-1">
      {label && <p className="text-base text-font_primary">{label}</p>}

      <div
        className={`relative flex items-center rounded-xl px-4 py-1 shadow-sm bg-feild_primay w-full border ${baseBorder} ${wrapperClassName} ${
          !editable ? "opacity-60" : ""
        }`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText={placeholder}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className={`w-full pr-10 outline-none text-font_primary bg-feild_primay h-10 ${inputClassName}`}
              dateFormat="yyyy-MM-dd"
              popperPlacement="bottom-start"
              ref={dateInputRef}
              minDate={minDate} 
              maxDate={maxDate} 
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
          onClick={() => dateInputRef.current.setFocus()}
          className={`absolute right-4 text-icon ${
            !editable ? "cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          <FiCalendar className="w-5 h-5" />
        </button>
      </div>

      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

export default InputDatePicker;
