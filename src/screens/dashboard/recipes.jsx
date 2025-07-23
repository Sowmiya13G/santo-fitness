import HorizontalCalendar from "@/components/horizontal-calendar";
import ScreenHeader from "@/components/screen-header";
import DietProgress from "@/components/ui/diet-progress";
import FilterBar from "@/components/ui/filter-bar";
import ProgressView from "@/components/ui/progress-view";
import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialNutritionData = [
  {
    type: "Calories",
    value: `0 kCal`,
    percentage: 0, // example max = 2000
    icon: "🔥",
  },
  {
    type: "Proteins",
    value: `0g`,
    percentage: 0,
    icon: "🥩",
  },
  {
    type: "Carbs",
    value: `0g`,
    percentage: 0,
    icon: "🌾",
  },
  {
    type: "Fats",
    value: `0g`,
    percentage: 0,
    icon: "🥚",
  },
];
const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nutritionData, setNutritionData] = useState(initialNutritionData);
  const [mealsData, setMealsData] = useState([]);

  const filterItems = [
    "All",
    "Morning snacks",
    "Breakfast",
    "Lunch",
    "Evening Snacks",
    "Dinner",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const typeMap = {
          All: "all",
          "Morning snacks": "morning_snack",
          Breakfast: "breakfast",
          Lunch: "lunch",
          "Evening Snacks": "evening_snack",
          Dinner: "dinner",
        };

        const type = typeMap[selectedFilter] || "all";

        const params = {
          date: formattedDate,
          type,
        };

        const res = await getDietProgress(params);
        const data = res?.[0] || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fibre: 0,
        };
        setMealsData(data.meals);
        setNutritionData([
          {
            type: "Calories",
            value: `${data.calories} kCal`,
            percentage: (data.calories / 2000) * 100, // example max = 2000
            icon: "🔥",
          },
          {
            type: "Proteins",
            value: `${data.protein}g`,
            percentage: (data.protein / 150) * 100,
            icon: "🥩",
          },
          {
            type: "Carbs",
            value: `${data.carbs}g`,
            percentage: (data.carbs / 300) * 100,
            icon: "🌾",
          },
          {
            type: "Fats",
            value: `${data.fat}g`,
            percentage: (data.fat / 70) * 100,
            icon: "🥚",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch diet data", error);
      }
    };

    fetchData();
  }, [selectedFilter, selectedDate]);

  return (
    <div className="h-full w-screen bg-white space-y-6 py-5 px-5 overflow-y-auto overflow-hidden mb-5">
      <ScreenHeader title="Meals Tracker" />
      <DietProgress />

      <div className="h-4" />
      <HorizontalCalendar onSelectDate={(date) => setSelectedDate(date)} />
      <FilterBar
        filters={filterItems}
        selected={selectedFilter}
        onSelect={(value) => setSelectedFilter(value)}
      />
      <div className=" flex flex-row justify-between items-center">
        <p className="text-lg font-medium text-font_primary">
          Meals Nutritions
        </p>
        <button
          onClick={() => navigate("/meals-details", { state: mealsData })}
        >
          <p className="text-base font-medium text-gradient">View More</p>
        </button>
      </div>

      {nutritionData.map((x, i) => (
        <ProgressView data={x} key={i} />
      ))}
    </div>
  );
};

export default Recipes;
