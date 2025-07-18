import { HorizontalLine } from "@/components/horizontal-line";
import ScreenHeader from "@/components/screen-header";
import { useSelector } from "react-redux";

import lunch from "../../assets/images/lunch.svg";
import snack from "../../assets/images/snack.svg";
import girl from "../../assets/images/workout-female.svg";
import boy from "../../assets/images/workout-male.svg";

const Notification = () => {
  const { userData } = useSelector((state) => state.auth);

  const data = [
    {
      title: "Hey, it’s time for lunch",
      time: "About 3 hours ago",
      image: lunch,
    },
    {
      title: "Time for your workout!",
      time: "About 2 hours ago",
      image: girl,
    },
    {
      title: "Snack time reminder",
      time: "About 1 hour ago",
      image: snack,
    },
    {
      title: "Don't forget your evening workout!",
      time: "Just now",
      image: boy,
    },
    {
      title: "Hey, it’s time for lunch",
      time: "About 3 hours ago",
      image: lunch,
    },
    {
      title: "Time for your workout!",
      time: "About 2 hours ago",
      image: girl,
    },
    {
      title: "Snack time reminder",
      time: "About 1 hour ago",
      image: snack,
    },
    {
      title: "Don't forget your evening workout!",
      time: "Just now",
      image: boy,
    },
    {
      title: "Hey, it’s time for lunch",
      time: "About 3 hours ago",
      image: lunch,
    },
    {
      title: "Time for your workout!",
      time: "About 2 hours ago",
      image: girl,
    },
    {
      title: "Snack time reminder",
      time: "About 1 hour ago",
      image: snack,
    },
    {
      title: "Don't forget your evening workout!",
      time: "Just now",
      image: boy,
    },
    {
      title: "Hey, it’s time for lunch",
      time: "About 3 hours ago",
      image: lunch,
    },
    {
      title: "Time for your workout!",
      time: "About 2 hours ago",
      image: girl,
    },
    {
      title: "Snack time reminder",
      time: "About 1 hour ago",
      image: snack,
    },
    {
      title: "Don't forget your evening workout!",
      time: "Just now",
      image: boy,
    },
  ];

  return (
    <div className="h-screen w-full bg-white flex flex-col py-6">
      <ScreenHeader title="Notifications" isBack />
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-5 space-y-4 mt-5">
        {data.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt="Notification" className="w-12 h-12" />
              <div className="flex flex-col">
                <p className="text-font_primary font-medium text-base">
                  {item.title}
                </p>
                <p className="text-icon text-sm">{item.time}</p>
              </div>
            </div>
            {index !== data?.length - 1 && <HorizontalLine />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
