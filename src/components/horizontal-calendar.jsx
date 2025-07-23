import { addDays, format, isSameDay } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HorizontalCalendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const dateRefs = useRef({});

  useEffect(() => {
    const start = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const end = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );
    const generatedDays = [];

    for (let d = start; d <= end; d = addDays(d, 1)) {
      generatedDays.push(new Date(d)); // clone date to avoid mutation
    }

    setDays(generatedDays);
  }, [selectedDate]);

  useEffect(() => {
    const ref = dateRefs.current[selectedDate.toDateString()];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedDate, days]);

  const handleDateSelect = (day) => {
    setSelectedDate(day); // Triggers the useEffect to regenerate the month
    onSelectDate?.(day);
  };

  const handlePrev = () => {
    setSelectedDate((prev) => {
      const prevMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return prevMonth;
    });
  };

  const handleNext = () => {
    setSelectedDate((prev) => {
      const nextMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextMonth;
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center space-x-6 px-4 mb-2">
        <button onClick={handlePrev} className="text-icon">
          <FiChevronLeft size={30} />
        </button>
        <span className="text-lg font-medium text-icon">
          {format(selectedDate, "MMMM yyyy")}
        </span>
        <button onClick={handleNext} className="text-icon">
          <FiChevronRight size={30} />
        </button>
      </div>

      <div className="flex overflow-x-scroll px-2 py-1 space-x-2 hide-scrollbar ">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              ref={(el) => {
                dateRefs.current[day.toDateString()] = el;
              }}
              onClick={() => handleDateSelect(day)}
              className={`flex flex-col items-center w-16 p-6 rounded-xl text-sm ${
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
