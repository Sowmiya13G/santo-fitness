import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FatInput = ({
  placeholder,
  name,
  wrapperClassName = "",
  FatInputClassName = "",
  maxLength,
  label,
  editable = true,
  onChange,
  currentVal = 0,
}) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  console.log('getValues: ', getValues());

  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";

  const [initialValue, setInitialValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(currentVal);

  useEffect(() => {
    const formVal = parseInt(getValues(name));
    const numericVal = isNaN(formVal) ? 0 : formVal;
    setInitialValue(numericVal);
    setCurrentValue(numericVal);
  }, [name, getValues]);

  useEffect(() => {
    setValue(name, currentValue);
    if (typeof onChange === "function") {
      onChange(currentValue);
    }
  }, [currentValue, name, setValue]);

  const increment = () => {
    if (!editable) return;
    setCurrentValue((prev) => prev + 1);
  };

  const decrement = () => {
    if (!editable) return;
    setCurrentValue((prev) => prev - 1);
  };

  const delta = currentValue - initialValue;
  const deltaDisplay = delta === 0 ? "0" : `${delta > 0 ? "+" : ""}${delta}`;
  const deltaColor =
    delta > 0 ? "text-green-500" : delta < 0 ? "text-red-500" : "text-gray-500";

  return (
    <div className="w-full space-y-1">
      {label && <p className="text-base text-font_primary">{label}</p>}

      <div
        className={`flex items-center rounded-xl px-4 py-1 shadow-sm bg-feild_primay gap-2 w-full border ${baseBorder} ${wrapperClassName} ${
          !editable ? "opacity-60" : ""
        }`}
      >
        <input
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={!editable}
          className={`flex-1 outline-none text-font_primary bg-feild_primay w-full h-10 ${
            !editable ? "cursor-not-allowed" : ""
          } ${FatInputClassName}`}
        />

        {editable && (
          <div className="flex flex-row justify-center items-center space-y-0">
            <span className={`text-xs ${deltaColor} mr-2`}>{deltaDisplay}</span>
            <div className="flex flex-col justify-center items-center space-y-0 ">
              <button type="button" onClick={increment}>
                <FaChevronUp size={14} color="#8E8E93" />
              </button>
              <button type="button" onClick={decrement}>
                <FaChevronDown size={14} color="#8E8E93" />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

export default FatInput;
