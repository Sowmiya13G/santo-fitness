import { useEffect, useState } from "react";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HorizontalCalendar = ({ onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const allDays = eachDayOfInterval({ start, end });
    setDays(allDays);
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    onSelectDate?.(day);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center space-x-6 px-4 mb-2">
        <button onClick={handlePrevMonth} className="text-icon">
          <FiChevronLeft size={30}/>
        </button>
        <span className="text-lg font-medium text-icon">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={handleNextMonth} className="text-icon">
          <FiChevronRight size={30}/>
        </button>
      </div>

      <div className="flex overflow-x-auto px-2 py-1 space-x-3 hide-scrollbar">
        {days.map((day) => {
          const isSelected =
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className={`flex flex-col items-center justify-center w-16 p-6 rounded-xl text-sm ${
                isSelected
                  ? "bg-secondary text-white"
                  : "bg-feild_primay text-icon"
              }`}
            >
              <span className="capitalize">{format(day, "EEE")}</span>
              <span className="text-base font-medium">{format(day, "d")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCalendar;
