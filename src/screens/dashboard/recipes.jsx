import HorizontalCalendar from "@/components/horizontal-calendar";
import ScreenHeader from "@/components/screen-header";
import DietProgress from "@/components/ui/diet-progress";
import FilterBar from "@/components/ui/filter-bar";
import ProgressView from "@/components/ui/progress-view";
import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import { getUsersList } from "@/features/user/user-api";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Dropdown from "@/components/input/dropdown";

const initialNutritionData = [
  { type: "Calories", value: `0 kCal`, percentage: 0, icon: "🔥" },
  { type: "Proteins", value: `0g`, percentage: 0, icon: "🥩" },
  { type: "Carbs", value: `0g`, percentage: 0, icon: "🌾" },
  { type: "Fats", value: `0g`, percentage: 0, icon: "🥚" },
];

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  console.log('userData: ', userData);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nutritionData, setNutritionData] = useState(initialNutritionData);
  const [mealsData, setMealsData] = useState([]);
  const { userList } = useSelector((state) => state.user);

  const methods = useForm();
  const { watch, setValue } = methods;

  const selectedUser = watch("person");

  const filterItems = [
    "All",
    "Morning snacks",
    "Breakfast",
    "Lunch",
    "Evening Snacks",
    "Dinner",
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    if (!selectedUser) return;
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
        userId: selectedUser,
      };

      const res = await getDietProgress(params);
      const data = res?.[0] || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fibre: 0,
        meals: [],
        targetCarbs:0,
        targetProtein:0,
        targetCalories:0,
        targetFat:0,
      };
      setMealsData(data.meals || []);
      setNutritionData([
        {
          type: "Calories",
          value: `${data.calories}/${data.targetCalories} kCal`,
          percentage: (data.calories / data.targetCalories) * 100,
          icon: "🔥",
        },
        {
          type: "Proteins",
          value: `${data.protein}/${data.targetProtein} g`,
          percentage: (data.protein / data.targetProtein) * 100,
          icon: "🥩",
        },
        {
          type: "Carbs",
          value: `${data.carbs}/${data.targetCarbs} g`,
          percentage: (data.carbs / data.targetCarbs) * 100,
          icon: "🌾",
        },
        {
          type: "Fats",
          value: `${data.fat}/${data.targetFat} g`,
          percentage: (data.fat / data.targetFat) * 100,
          icon: "🥚",
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch diet data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilter, selectedDate, selectedUser]);

  useEffect(() => {
    if (userList) {
      setValue("person", userList[0]?.value);
    }
  }, [setValue, userList]);
  return (
    <div className="h-full w-screen bg-white space-y-6 py-5 px-5 overflow-y-auto overflow-hidden mb-5">
      <FormProvider {...methods}>
        <ScreenHeader title="Meals Tracker" />
        <HorizontalCalendar onSelectDate={(date) => setSelectedDate(date)} />

        <Dropdown
          name="person"
          label="Select Client"
          options={userList}
          value={selectedUser}
          onChange={(val) => {
            setValue("person", val);
          }}
          placeholder="Select client"
        />

        {/* <DietProgress /> */}
        <FilterBar
          filters={filterItems}
          selected={selectedFilter}
          onSelect={(value) => setSelectedFilter(value)}
        />

        <div className="flex flex-row justify-between items-center">
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
      </FormProvider>
    </div>
  );
};

export default Recipes;
