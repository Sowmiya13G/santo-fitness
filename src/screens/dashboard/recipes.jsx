// packages
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// redux
// component
import ScreenHeader from "@/components/screen-header";
import ActivityGrid from "@/components/ui/active-grid";
import DietProgress from "@/components/ui/diet-progress";
import ProgressView from "@/components/ui/progress-view";

const Recipes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
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

  return (
    <div className="h-full w-screen bg-white space-y-6 py-5 px-5">
      <ScreenHeader title="Meals Tracker" />
      <DietProgress />
      <div className="h-4"/>
        {nutritionData?.map((x, y) => (
          <ProgressView data={x} key={y} />
        ))}
    </div>
  );
};

export default Recipes;
