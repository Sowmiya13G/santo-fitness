import BMICard from "@/components/card/bmi-card";
import BMRCard from "@/components/card/bmr-card";
import RankCard from "@/components/card/rank-card";
import ScreenHeader from "@/components/screen-header";
import ActivityGrid from "@/components/ui/active-grid";
import DietProgress from "@/components/ui/diet-progress";
import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import {
  setTodayLogs,
  setWeekLogs,
} from "@/features/daily-logs/daily-logs-slice";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ClientDashboard = ({loading}) => {
  const { userData } = useSelector((state) => state.auth);

  const { topClient } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          days: 14,
        };
        const raw = await getDietProgress(params);
        console.log("raw: ", raw);
        dispatch(setWeekLogs(raw));
        const today = format(new Date(), "yyyy-MM-dd");
        console.log("today: ", today);
        const todayLog = raw.find(
          (log) => format(parseISO(log.date), "yyyy-MM-dd") === today
        );
        console.log("todayLog: ", todayLog);

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
    <div className="w-full h-full space-y-6 px-3 text-gray-800 hide-scrollbar py-6 ">
      <ScreenHeader isHome />
      <div className="flex gap-4 overflow-x-auto overflow-hidden hide-scrollbar h-full snap-x snap-mandatory">
        <div className="min-w-[90%] h-full snap-center snap-always ">
          <BMICard bmi={userData.BMI} />
        </div>
        <div className="min-w-[90%] snap-center snap-always">
          <BMRCard bmr={userData.BMR} />
        </div>
      </div>{" "}
      {loading && (
        <p className="text-center text-gray-500 text-base font-medium my-2">
          Loading...
        </p>
      )}
      {topClient && (
        <RankCard label={"top performed client "} data={topClient} />
      )}
      <ActivityGrid />
      <DietProgress />
      {/* <BestDietMeals /> */}
    </div>
  );
};

export default ClientDashboard;
