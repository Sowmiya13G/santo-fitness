import { useEffect, useState } from "react";
import NutrientProgress from "../card/nutrient-progress";
import { getDietProgress } from "@/features/daily-logs/daily-logs-api";

const ActivityGrid = () => {
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
  console.log("nutrients: ", nutrients);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const params = {
        //   // days: 1,
        // };

        const raw = await getDietProgress();

        if (!Array.isArray(raw) || raw.length === 0) return;

        const todayData = raw[0];

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
      } catch (error) {
        console.error("Failed to fetch diet progress:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gradient">
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
