import { useSelector } from "react-redux";
import UserCard from "./user-card";

const UserDetailsCard = ({ label, showTrainer = false }) => {
  const { userList, trainerList } = useSelector((state) => state.user);
  const list = showTrainer ? trainerList : userList;
  const hasData = list && list.length > 0;

  return (
    <>
      <p className="text-gray-600 capitalize text-center">{label}</p>

      {hasData ? (
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-1 snap-x snap-mandatory">
          {list.map((user) => (
            <UserCard key={user.id} user={user} customButtonClass="!w-24" />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-sm text-center py-4">
          No data available
        </div>
      )}
    </>
  );
};

export default UserDetailsCard;
