import BMICard from "@/components/card/bmi-card";
import ActivityGrid from "@/components/ui/active-grid";
import BestDietMeals from "@/components/ui/best-diet-meals";
import DietProgress from "@/components/ui/diet-progress";
import Header from "@/components/ui/header";

const ClientDashboard = () => {
  return (
    <div className=" space-y-6 text-gray-800 ">
      <Header name="Stefani Wong" />
      <BMICard bmi="20.1" />
      <ActivityGrid />
      <DietProgress />
      <BestDietMeals />
    </div>
  );
};

export default ClientDashboard;
