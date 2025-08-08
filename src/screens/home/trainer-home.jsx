import PendingListCard from "@/components/card/pending-list-card";
import RankCard from "@/components/card/rank-card";
import UserDetailsCard from "@/components/card/user-detail-card";
import ScreenHeader from "@/components/screen-header";
import { getDietPendingProgress } from "@/features/daily-logs/daily-logs-api";
import { setPendingLogsList } from "@/features/daily-logs/daily-logs-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TrainerDashboard = ({ loading }) => {
  const { topClient } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchDietPendingProgress = async () => {
    const response = await getDietPendingProgress();
    dispatch(setPendingLogsList(response));
  };

  useEffect(() => {
    fetchDietPendingProgress();
  }, []);
  return (
    <div className="w-full space-y-6 px-3 hide-scrollbar ">
      <ScreenHeader isHome />
      <div className="h-2" />
      {loading && (
        <p className="text-center text-gray-500 text-base font-medium my-2">
          Loading...
        </p>
      )}
      <RankCard label={"top performed client "} data={topClient} />
      <UserDetailsCard label={"My Clients"} />
      <PendingListCard label={"pending List"} />
    </div>
  );
};
export default TrainerDashboard;
