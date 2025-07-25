import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { BsGraphDownArrow, BsGraphUpArrow ,} from "react-icons/bs";

const users = [
  {
    id: 1,
    name: "John",
    img: "https://i.pravatar.cc/100?img=1",
    ratio: 12,
    trend: "up",
  },
  {
    id: 2,
    name: "Jane",
    img: "https://i.pravatar.cc/100?img=2",
    ratio: -8,
    trend: "down",
  },
  {
    id: 3,
    name: "Alice",
    img: "https://i.pravatar.cc/100?img=3",
    ratio: 5,
    trend: "up",
  },
  {
    id: 4,
    name: "Bob",
    img: "https://i.pravatar.cc/100?img=4",
    ratio: 3,
    trend: "up",
  },
  {
    id: 5,
    name: "Eve",
    img: "https://i.pravatar.cc/100?img=5",
    ratio: 2,
    trend: "up",
  },
];

const RankCard = ({ label }) => {
  return (
    <>
      <p className="text-gray-600 capitalize text-center mb-3">{label}</p>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar  snap-x snap-mandatory ">
        {users.map((user) => (
          <div
            key={user.id}
            className="max-w-[90px] snap-center rounded-lg bg-gray-100 flex flex-col space-y-1 p-3"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden  shadow-md">
              <img
                src={user.img}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
              {user.trend === "up" ? (
                <BsGraphUpArrow className="text-green-500 w-4 h-4" />
              ) : (
                <BsGraphDownArrow className="text-red-500 w-4 h-4" />
              )}
              <span>{Math.abs(user.ratio)}%</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RankCard;
