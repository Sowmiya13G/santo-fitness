import React from "react";

const Switch = ({ checked, onChange }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        checked ? "bg-primary-gradient" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Switch;
