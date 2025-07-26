import React, { useState } from "react";
// packages
import { FaAngleRight, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// components
import Button from "@/components/button";
import ScreenHeader from "@/components/screen-header";

const CompareScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  const [month1, setMonth1] = useState(null);
  const [month2, setMonth2] = useState(null);
  const [openPicker, setOpenPicker] = useState(null); 
  console.log("openPicker: ", openPicker);

  const formatMonth = (date) => {
    return date
      ? date.toLocaleString("default", { month: "long", year: "numeric" })
      : "Select Month";
  };

  const handleDateSelect = (date) => {
    if (openPicker === 1) setMonth1(date);
    if (openPicker === 2) setMonth2(date);
    setOpenPicker(null);
  };

  return (
    <div className="w-screen space-y-6 hide-scrollbar px-5 py-6">
      <ScreenHeader title="Comparison" isBack />
      <div className="h-5" />

      <div className="space-y-5">
        <button
          onClick={() => setOpenPicker(1)}
          className="bg-field_primary w-full px-4 py-5 rounded-lg flex items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-4">
            <FaCalendarAlt size={20} color="#8E8E93" />
            <p className="text-icon text-base">{formatMonth(month1)}</p>
          </div>
          <FaAngleRight size={20} color="#8E8E93" />
        </button>

        <button
          onClick={() => setOpenPicker(2)}
          className="bg-field_primary w-full px-4 py-5 rounded-lg flex items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-4">
            <FaCalendarAlt size={20} color="#8E8E93" />
            <p className="text-icon text-base">{formatMonth(month2)}</p>
          </div>
          <FaAngleRight size={20} color="#8E8E93" />
        </button>
      </div>

      {openPicker !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg">
            <DatePicker
              selected={openPicker === 1 ? month1 : month2}
              onChange={handleDateSelect}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              inline
              monthClassName={(date) =>
                (openPicker === 1 &&
                  date.getMonth() === month1?.getMonth() &&
                  date.getFullYear() === month1?.getFullYear()) ||
                (openPicker === 2 &&
                  date.getMonth() === month2?.getMonth() &&
                  date.getFullYear() === month2?.getFullYear())
                  ? "bg-primary-gradient text-white rounded-full"
                  : ""
              }
              calendarClassName="scale-[1.6] gap-2"
            />
          </div>
        </div>
      )}

      <div className="w-full absolute bottom-10 left-0 px-6">
        <Button
          label="Compare"
          onClick={() =>
            navigate("/result", { state: { month1, month2 } })
          }
        />
      </div>
    </div>
  );
};

export default CompareScreen;
