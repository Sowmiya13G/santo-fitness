import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NutrientProgress from "../card/nutrient-progress";

const ActivityGrid = () => {
  const { todayLogs } = useSelector((state) => state.dailyLogs);
  const { userData } = useSelector((state) => state.auth);

  const initialData = [
    {
      label: "Calories",
      consumed: 0,
      total: userData.targetCalories,
    },
    {
      label: "Protein",
      consumed: 0,
      total: userData.targetProtein,
    },
    {
      label: "Fat",
      consumed: 0,
      total: userData.targetFat,
    },
    {
      label: "Carbs",
      consumed: 0,
      total: userData.targetCarbs,
    },
  ];
  const [nutrients, setNutrients] = useState(initialData);

  useEffect(() => {
    if (!todayLogs) {
      return;
    }
    const todayData = todayLogs;

    // You can define "total" values based on user target, or statically for now
    const totals = {
      Calories: userData.targetCalories,
      Protein: userData.targetProtein,
      Fat: userData.targetFat,
      Carbs: userData.targetCarbs,
    };

    const formatted = [
      {
        label: "Calories",
        consumed: todayData.calories,
        total: totals.Calories,
      },
      {
        label: "Protein",
        consumed: todayData.protein,
        total: totals.Protein,
      },
      {
        label: "Fat",
        consumed: todayData.fat,
        total: totals.Fat,
      },
      {
        label: "Carbs",
        consumed: todayData.carbs,
        total: totals.Carbs,
      },
    ];

    setNutrients(formatted);
  }, [todayLogs, userData.targetCalories, userData.targetCarbs, userData.targetFat, userData.targetProtein]);

  return (
    <div>
      <h2 className="text-md text-center font-semibold mb-4 text-gradient">
        Today Nutrient Summary
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {nutrients.map((nutrient) => (
          <NutrientProgress key={nutrient.label} {...nutrient} />
        ))}
      </div>
    </div>
  );
};

export default ActivityGrid;
