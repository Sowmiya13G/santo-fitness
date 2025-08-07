import PendingListCard from "@/components/card/pending-list-card";
import RankCard from "@/components/card/rank-card";
import UserDetailsCard from "@/components/card/user-detail-card";
import ScreenHeader from "@/components/screen-header";
import { getDietPendingProgress } from "@/features/daily-logs/daily-logs-api";
import { setPendingLogsList } from "@/features/daily-logs/daily-logs-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TrainerDashboard = () => {
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
      <RankCard label={"top performed client "} data={topClient} />
      <UserDetailsCard label={"My Clients"} />
      <PendingListCard label={"pending List"} />
    </div>
  );
};
export default TrainerDashboard;
