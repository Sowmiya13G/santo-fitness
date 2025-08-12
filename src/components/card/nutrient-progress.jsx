import React, { useEffect, useState } from "react";

export default function NutrientProgress({
  label,
  consumed,
  total,
  color = "#9C0707",
  bgColor = "#B1252590",
}) {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.min(consumed / total, 1);
  const remaining = total - consumed;

  // State for animated strokeDashoffset
  const [strokeDashoffset, setStrokeDashoffset] = useState(
    circumference - progress * circumference
  );

  // Animate strokeDashoffset on consumed/total change
  useEffect(() => {
    const newOffset = circumference - progress * circumference;
    setStrokeDashoffset(newOffset);
  }, [progress, circumference]);

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-b-gray-300 p-4">
      <div className="text-gray-800 font-medium text-sm">{label}</div>

      <div className={`text-xl font-bold`} style={{ color }}>
        {consumed}g
      </div>
      <div className="relative max-w-[80px] mt-4 max-h-[80px] w-[100px] h-[100px] flex flex-col items-center justify-center mx-auto">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-90"
        >
          <circle
            stroke={bgColor}
            fill="none"
            strokeWidth={stroke}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
          />
          <circle
            stroke={color}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
          />
        </svg>

        <div
          className={`z-10 text-center flex items-center justify-center w-[95%] h-[95%] rounded-full bg-red_25`}
        >
          <div className="text-sm mt-1 text-white">{remaining}g left</div>
        </div>
      </div>
    </div>
  );
}
