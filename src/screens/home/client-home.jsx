import BMICard from "@/components/card/bmi-card";
import BMRCard from "@/components/card/bmr-card";
import RankCard from "@/components/card/rank-card";
import ScreenHeader from "@/components/screen-header";
import ActivityGrid from "@/components/ui/active-grid";
import BestDietMeals from "@/components/ui/best-diet-meals";
import DietProgress from "@/components/ui/diet-progress";
import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import {
  setTodayLogs,
  setWeekLogs,
} from "@/features/daily-logs/daily-logs-slice";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ClientDashboard = () => {
  const { userData } = useSelector((state) => state.auth);
  console.log("userData: ", userData);
  const { topClient } = useSelector((state) => state.user);
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
    <div className="w-full space-y-6 px-3 text-gray-800 hide-scrollbar ">
      <ScreenHeader isHome />
     
      <div className="flex gap-4 overflow-x-auto overflow-hidden hide-scrollbar h-full snap-x snap-mandatory">
        <div className="min-w-[90%] h-full snap-center snap-always ">
          <BMICard bmi={userData.BMI} />
        </div>
        <div className="min-w-[90%] snap-center snap-always">
          <BMRCard bmr={userData.BMR} />
        </div>
      </div>{" "}
       {topClient && (
        <RankCard label={"top performed client "} data={topClient} />
      )}
      <ActivityGrid />
      <DietProgress />
      <BestDietMeals />
    </div>
  );
};

export default ClientDashboard;
