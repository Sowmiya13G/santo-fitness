import BMICard from "@/components/card/bmi-card";
import BMRCard from "@/components/card/bmr-card";
import ScreenHeader from "@/components/screen-header";
import ActivityGrid from "@/components/ui/active-grid";
import BestDietMeals from "@/components/ui/best-diet-meals";
import DietProgress from "@/components/ui/diet-progress";
import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import { setTodayLogs, setWeekLogs } from "@/features/daily-logs/daily-logs-slice";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ClientDashboard = () => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          days: 14,
        };

        const raw = await getDietProgress(params);

        dispatch(setWeekLogs(raw));
         const today = format(new Date(), "yyyy-MM-dd");
      const todayLog = raw.find((log) => log.date === today);

      if (todayLog) {
        dispatch(setTodayLogs(todayLog));
      } else {
        dispatch(setTodayLogs(null)); // or handle missing log case
      }

      } catch (error) {
        console.error("Failed to fetch diet progress:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full space-y-6 text-gray-800 hide-scrollbar ">
      <ScreenHeader isHome />
      <div className="flex gap-4 overflow-x-auto hide-scrollbar px-1 snap-x snap-mandatory">
        <div className="min-w-[100%] snap-center snap-always">
          <BMICard bmi={userData.BMI} />
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
