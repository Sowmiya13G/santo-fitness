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
  isLoading = false, // <-- New prop
}) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";

  const [initialValue, setInitialValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(currentVal);

  useEffect(() => {
    const formVal = parseFloat(getValues(name));
    const numericVal = isNaN(formVal) ? 0 : formVal;
    setInitialValue(numericVal);
    setCurrentValue(numericVal);
  }, [name, getValues]);

  useEffect(() => {
    setValue(name, currentValue);
    if (typeof onChange === "function") {
      onChange(currentValue);
    }
  }, [currentValue, name, setValue, onChange]);

  const increment = () => {
    if (!editable || isLoading) return;
    setCurrentValue((prev) => parseFloat((prev + 0.1).toFixed(1)));
  };

  const decrement = () => {
    if (!editable || isLoading) return;
    setCurrentValue((prev) => parseFloat((prev - 0.1).toFixed(1)));
  };

  const handleInputChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setCurrentValue(val);
    } else if (e.target.value === "") {
      setCurrentValue("");
    }
  };

  const delta = parseFloat((currentValue - initialValue).toFixed(1));
  const deltaDisplay = delta === 0 ? "0" : `${delta > 0 ? "+" : ""}${delta}`;
  const deltaColor =
    delta > 0 ? "text-green-500" : delta < 0 ? "text-red-500" : "text-gray-500";
  const isInputDisabled = !editable || isLoading;

  return (
    <div className="w-full space-y-1">
      {label && <p className="text-base text-font_primary">{label}</p>}

      <div
        className={`flex items-center rounded-xl px-4 py-1 shadow-sm bg-feild_primay gap-2 w-full border ${baseBorder} ${wrapperClassName} ${
          !editable || isLoading ? "opacity-60" : ""
        } ${isLoading ? "shimmer" : ""}`}
      >
        <input
          type="number"
          step="0.1"
          value={isLoading ? "" : currentValue}
          onChange={handleInputChange}
          name={name}
          placeholder={isLoading ? "" : placeholder}
          maxLength={maxLength}
          disabled={!editable || isLoading}
          className={`flex-1 outline-none text-font_primary  w-full h-10 ${
            !editable ? "cursor-not-allowed" : ""
          } ${FatInputClassName}`}
        />

        {!isLoading && editable && (
          <div className="flex flex-row justify-center items-center space-y-0">
            <span className={`text-xs ${deltaColor} mr-2`}>{deltaDisplay}</span>
            <div className="flex flex-col justify-center items-center space-y-0">
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

      {/* Shimmer effect */}
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

export default FatInput;
