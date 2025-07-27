import { useSelector } from "react-redux";
import UserCard from "./user-card";

const UserDetailsCard = ({ label, showTrainer = false }) => {
  const { userList, trainerList } = useSelector((state) => state.user);
  const list = showTrainer ? trainerList : userList;
  return (
    <>
      <p className="text-gray-600 capitalize text-center ">{label}</p>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar !m-2 px-1 snap-x snap-mandatory">
        {list.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default UserDetailsCard;
