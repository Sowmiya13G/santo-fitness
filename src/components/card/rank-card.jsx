import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";

const RankCard = ({ label, data }) => {
  return (
    <>
      <p className="text-gray-600 capitalize text-center mb-3">{label}</p>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar  snap-x snap-mandatory ">
        {data.map((user) => (
          <div
            key={user.userId}
            className="max-w-[90px] snap-center rounded-lg bg-gray-100 flex flex-col space-y-1 p-3"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden  shadow-md">
              <img
                src={user?.profileImg}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-center truncate">{user.name}</span>

            {/* <div className="flex items-center gap-1 text-xs font-medium text-gray-700"> */}
              {/* {user.trend === "up" ? (
                <BsGraphUpArrow className="text-green-500 w-4 h-4" />
              ) : (
                <BsGraphDownArrow className="text-red-500 w-4 h-4" />
              )} */}
              <span className="text-center text-xs">{Math.abs(user.avgProgress)}%</span>
            {/* </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default RankCard;
