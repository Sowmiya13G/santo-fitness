import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  name,
  editable = true,
  wrapperClassName = "",
  inputClassName = "",
  isLoading = false,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";
  const isInputDisabled = !editable || isLoading;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    if (isInputDisabled) return;
    setValue(name, val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div className="w-full space-y-1" ref={ref}>
      {label && <p className="text-base text-font_primary">{label}</p>}

      <div
        className={`relative rounded-xl px-4 py-1 shadow-sm bg-field_primary w-full border ${baseBorder} ${wrapperClassName} ${
          isInputDisabled ? "opacity-60" : ""
        } ${isLoading ? "shimmer" : ""}`}
        onClick={() => !isInputDisabled && setOpen(!open)}
      >
        <div
          className={`h-10 flex items-center justify-between cursor-pointer text-font_primary ${inputClassName}`}
        >
          <span className={`${!value ? "text-icon" : ""}`}>
            {isLoading
              ? ""
              : value
              ? options.find((o) => o.value === value)?.label
              : placeholder}
          </span>
          <FiChevronDown className="text-icon" />
        </div>

        {open && !isInputDisabled && (
          <div className="absolute z-10 top-full mt-1 left-0 w-full bg-white rounded-lg shadow border border-gray-200 max-h-60 overflow-y-auto">
            {options.length > 0 ? (
              options.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 z-50 text-sm text-font_primary ${
                    value === opt.value ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">
                No data found
              </div>
            )}
          </div>
        )}
      </div>

      <input type="hidden" {...register(name)} value={value ?? ""} />

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

export default Dropdown;
