import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NutrientProgress from "../card/nutrient-progress";

const ActivityGrid = () => {
  const { todayLogs } = useSelector((state) => state.dailyLogs);
  console.log("todayLogs: ", todayLogs);
  const { userData } = useSelector((state) => state.auth);
  console.log('userData: ', userData);

  const initialData = [
    {
      label: "Calories",
      consumed: 0,
      total: userData?.targetCalories || 0,
    },
    {
      label: "Protein",
      consumed: 0,
      total: userData?.targetProtein ||0,
    },
    {
      label: "Fat",
      consumed: 0,
      total: userData?.targetFat || 0,
    },
    {
      label: "Carbs",
      consumed: 0,
      total: userData?.targetCarbs || 0,
    },
  ];
  const [nutrients, setNutrients] = useState(initialData);

  useEffect(() => {
    if (!todayLogs) {
      setNutrients(initialData);
      return
    }
    const todayData = todayLogs;

    // You can define "total" values based on user target, or statically for now
    const totals = {
      Calories: todayLogs.targetCalories,
      Protein: todayLogs.targetProtein,
      Fat: todayLogs.targetFat,
      Carbs: todayLogs.targetCarbs,
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
  }, [
    todayLogs,
    userData.targetCalories,
    userData.targetCarbs,
    userData.targetFat,
    userData.targetProtein,
  ]);

  return (
    <div>
      <h2 className="text-md text-center font-semibold mb-4 text-gradient">
        Nutrient Summary
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
