import ActivityCard from "./active-card";

const activities = [
  { label: "Calories", value: "760 kCal", left: "230 kCal" },
  { label: "Protein", value: "100 g", left: "50 g" },
  { label: "Sleep", value: "8h 20m" },
  { label: "Carbs", value: "10 g", left: "6 g" },
  { label: "Fibre", value: "4 g", left: "2 g" },
  { label: "Fat", value: "10 g", left: "5 g" },
];

const ActivityGrid = () => (
  <div>
    <h2 className="text-base font-semibold mb-2">Activity Progress</h2>
    <div className="grid grid-cols-2 gap-4">
      {activities.map((a) => (
        <ActivityCard key={a.label} {...a} />
      ))}
    </div>
  </div>
);

export default ActivityGrid;
