import RankCard from "@/components/card/rank-card";
import UserDetailsCard from "@/components/card/user-detail-card";
import ScreenHeader from "@/components/screen-header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ loading }) => {
  const { userList, trainerList, topClient } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
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
      {/* <RankCard label={"top performed trainer "} data={trainerList} /> */}
      <UserDetailsCard label={"SFC Trainers"} showTrainer showButton={false} />
      <UserDetailsCard
        label={"SFC Clients"}
        onClick={() => navigate("/activity-history")}
        goal={"Goal Not Initiated"}
        isClient={true}
      />
    </div>
  );
};
export default AdminDashboard;
