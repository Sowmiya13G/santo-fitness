import React from "react";

export default function ProfileCard({
  image,
  name,
  program,
  height,
  weight,
  age,
}) {
  const stats = [
    { label: "Height", value: `${height}cm` },
    { label: "Weight", value: `${weight}kg` },
    { label: "Age", value: `${age}yo` },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-base font-semibold text-font_primary">{name}</h2>
          <p className="text-sm text-gray-500">{program}</p>
        </div>
      </div>

      <div className="flex justify-between">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center bg-white shadow-md rounded-xl px-4 py-3 min-w-[90px]"
          >
            <span className="text-primary font-semibold">{value}</span>
            <span className="text-xs text-gray-500 mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
