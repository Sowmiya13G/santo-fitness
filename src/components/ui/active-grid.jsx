import NutrientProgress from "../card/nutrient-progress";

const nutrients = [
  {
    label: "Calories",
    consumed: 760,
    total: 1000,
    color: "#b30000",
    bgColor: "#f3a9a9",
  },
  {
    label: "Protein",
    consumed: 45,
    total: 60,
    color: "#0077cc",
    bgColor: "#cce5ff",
  },
  {
    label: "Fat",
    consumed: 20,
    total: 30,
    color: "#ff9900",
    bgColor: "#ffe0b3",
  },
  {
    label: "Fiber",
    consumed: 12,
    total: 25,
    color: "#2e8b57",
    bgColor: "#c2f0d4",
  },
];

const ActivityGrid = () => (
  <div className="">
    <h2 className="text-xl font-semibold mb-4 text-gradient">
      Today Nutrient Summary
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {nutrients.map((nutrient) => (
        <NutrientProgress key={nutrient.label} {...nutrient} />
      ))}
    </div>
  </div>
);

export default ActivityGrid;
