import { useFormContext } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
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
}) => {
  const { register, setValue, formState: { errors } } = useFormContext();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const error = errors?.[name]?.message;
  const baseBorder = error ? "border-red-500" : "border-gray-300";

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
    setValue(name, val); 
    onChange?.(val);   
    setOpen(false);
  };

  return (
    <div className="w-full space-y-1" ref={ref}>
      {label && <p className="text-base text-black">{label}</p>}

      <div
        className={`relative rounded-xl px-4 py-1 shadow-sm bg-feild_primay w-full border ${baseBorder} ${wrapperClassName} ${
          !editable ? "opacity-60" : ""
        }`}
        onClick={() => editable && setOpen(!open)}
      >
        <div
          className={`h-10 flex items-center justify-between cursor-pointer text-font_primary ${inputClassName}`}
        >
          <span className={`${!value ? "text-icon" : ""}`}>
            {value ? options.find((o) => o.value === value)?.label : placeholder}
          </span>
          <FiChevronDown className="text-icon" />
        </div>

        {open && (
          <div className="absolute z-10 top-full mt-1 left-0 w-full bg-white rounded-lg shadow border border-gray-200 max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-font_primary ${
                  value === opt.value ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <input type="hidden" {...register(name)} value={value ?? ""} />

      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

export default Dropdown;
