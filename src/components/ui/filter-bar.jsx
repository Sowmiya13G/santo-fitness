import React, { useState } from "react";

const FilterBar = ({ filters = [], onSelect }) => {
  const [selected, setSelected] = useState(filters[0]);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
  };

  return (
    <div className="w-full overflow-x-auto hide-scrollbar ">
      <div className="flex space-x-3 w-max px-4 py-2">
        {filters.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelect(item)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
              selected === item
                ? "bg-primary-gradient text-white shadow font-medium"
                : "bg-opacity_primary text-icon"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
