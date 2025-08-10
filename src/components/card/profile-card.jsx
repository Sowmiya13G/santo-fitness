import React from "react";
import { useSelector } from "react-redux";

export default function ProfileCard({ setShowModal }) {
  const { userData } = useSelector((state) => state.auth);

  const stats = [
    { label: "Height", value: `${userData.height}cm` },
    { label: "Weight", value: `${userData.weight}kg` },
    { label: "Age", value: `${userData.age}yo` },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={userData.profileImg}
          alt={userData.name}
          onClick={() => setShowModal(true)}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-base font-semibold text-font_primary">
            {userData.name}
          </h2>
          <p className="text-sm text-gray-500">{userData.program}</p>
        </div>
      </div>

      <div className="flex justify-between">
        {userData.height &&
          userData.weight &&
          userData.age &&
          stats.map(({ label, value }) => (
            <div
              key={label}
              className={` flex flex-col items-center bg-white shadow-md rounded-xl px-4 py-3 min-w-[90px]`}
            >
              <span className="text-primary font-semibold">{value}</span>
              <span className="text-xs text-gray-500 mt-1">{label}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
