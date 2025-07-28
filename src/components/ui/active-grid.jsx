import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NutrientProgress from "../card/nutrient-progress";

const ActivityGrid = () => {
  const { todayLogs } = useSelector((state) => state.dailyLogs);

  const initialData = [
    {
      label: "Calories",
      consumed: 0,
      total: 100,
    },
    {
      label: "Protein",
      consumed: 0,
      total: 100,
    },
    {
      label: "Fat",
      consumed: 0,
      total: 100,
    },
    {
      label: "Fiber",
      consumed: 0,
      total: 100,
    },
  ];
  const [nutrients, setNutrients] = useState(initialData);

  useEffect(() => {

    if(!todayLogs){
      return
    }
    const todayData = todayLogs;
    console.log('todayData: ', todayData);

    // You can define "total" values based on user target, or statically for now
    const totals = {
      Calories: 1000,
      Protein: 60,
      Fat: 30,
      Fiber: 25,
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
        label: "Fiber",
        consumed: todayData.fibre,
        total: totals.Fiber,
      },
    ];

    setNutrients(formatted);
  }, [todayLogs]);

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
