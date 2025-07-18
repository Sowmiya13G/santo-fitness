import BMICard from "@/components/card/bmi-card";
import BMRCard from "@/components/card/bmr-card";
import ScreenHeader from "@/components/screen-header";
import ActivityGrid from "@/components/ui/active-grid";
import BestDietMeals from "@/components/ui/best-diet-meals";
import DietProgress from "@/components/ui/diet-progress";
import Header from "@/components/ui/header";
import { useEffect } from "react";

const ClientDashboard = () => {
  useEffect(()=>{

  },[])
  return (
    <div className="w-full space-y-6 text-gray-800 hide-scrollbar ">
      <ScreenHeader isHome />
      <div className="flex gap-4 overflow-x-auto hide-scrollbar px-1 snap-x snap-mandatory">
        <div className="min-w-[100%] snap-center snap-always">
          <BMICard bmi="20.1" />
        </div>
        <div className="min-w-[100%] snap-center snap-always">
          <BMRCard bmr={1630} />
        </div>
      </div>{" "}
      <ActivityGrid />
      <DietProgress />
      <BestDietMeals />
    </div>
  );
};

export default ClientDashboard;
