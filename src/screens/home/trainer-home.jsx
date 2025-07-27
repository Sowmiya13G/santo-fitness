import PendingListCard from "@/components/card/pending-list-card";
import RankCard from "@/components/card/rank-card";
import UserDetailsCard from "@/components/card/user-detail-card";
import ScreenHeader from "@/components/screen-header";
import { useSelector } from "react-redux";

const TrainerDashboard = () => {
  const { userList } = useSelector((state) => state.user);

  return (
    <div className="w-full space-y-6 px-3 hide-scrollbar ">
      <ScreenHeader isHome />
      <RankCard label={"top performed client "} data={userList} />
      <UserDetailsCard label={"My Clients"} />
      <PendingListCard label={"pending List"} />
    </div>
  );
};
export default TrainerDashboard;
