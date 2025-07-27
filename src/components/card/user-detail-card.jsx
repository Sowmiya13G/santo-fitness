import { useSelector } from "react-redux";
import UserCard from "./user-card";

const UserDetailsCard = ({ label }) => {
  const { userList } = useSelector((state) => state.user);

  return (
    <>
      <p className="text-gray-600 capitalize text-center ">{label}</p>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar !m-2 px-1 snap-x snap-mandatory">
        {userList.map((user) => (
          <UserCard key={user.id} user={user}/>
        ))}
      </div>
    </>
  );
};

export default UserDetailsCard;
