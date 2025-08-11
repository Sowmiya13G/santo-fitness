import RankCard from "@/components/card/rank-card";
import UserDetailsCard from "@/components/card/user-detail-card";
import ScreenHeader from "@/components/screen-header";
import { useSelector } from "react-redux";

const AdminDashboard = ({ loading }) => {
  const { userList, trainerList, topClient } = useSelector(
    (state) => state.user
  );

  return (
    <div className="w-full space-y-6 px-3 hide-scrollbar ">
      <ScreenHeader isHome  />
      <div className="h-2" />
      {loading && (
        <p className="text-center text-gray-500 text-base font-medium my-2">
          Loading...
        </p>
      )}
      <RankCard label={"top performed client "} data={topClient} />
      <RankCard label={"top performed trainer "} data={trainerList} />
      <UserDetailsCard label={"SFC Trainers"} showTrainer />
      <UserDetailsCard label={"SFC Clients"} />
    </div>
  );
};
export default AdminDashboard;
