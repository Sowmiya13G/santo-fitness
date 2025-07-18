// packages
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// redux
// component
import ScreenHeader from "@/components/screen-header";
import DietProgress from "@/components/ui/diet-progress";
import FilterBar from "@/components/ui/filter-bar";
import ProgressView from "@/components/ui/progress-view";
import { useState } from "react";

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const nutritionData = [
    {
      type: "Calories",
      value: "320 kCal",
      percentage: 70,
      icon: "🔥",
    },
    {
      type: "Proteins",
      value: "300g",
      percentage: 50,
      icon: "🥩",
    },
    {
      type: "Fats",
      value: "140g",
      percentage: 35,
      icon: "🥚",
    },
    {
      type: "Carbo",
      value: "140g",
      percentage: 35,
      icon: "🌾",
    },
  ];
  const filterItems = [
    "All",
    "Morning snacks",
    "Breakfast",
    "Lunch",
    "Evening Snacks",
    "Dinner",
  ];

  return (
    <div className="h-full w-screen bg-white space-y-6 py-5 px-5 overflow-y-auto overflow-hidden">
      <ScreenHeader title="Meals Tracker" />
      <DietProgress />
      <div className="h-4" />
      <FilterBar
        filters={filterItems}
        onSelect={(value) => setSelectedFilter(value)}
      />
      <div className=" flex flex-row justify-between items-center">
        <p className="text-lg font-medium text-font_primary">
          Meals Nutritions
        </p>
        <button onClick={() => {}}>
          <p className="text-base font-medium text-gradient">View More</p>
        </button>
      </div>
      {nutritionData?.map((x, y) => (
        <ProgressView data={x} key={y} />
      ))}
    </div>
  );
};

export default Recipes;
