import { NavLink } from "react-router-dom";

// Import your SVGs
import GraphActive from "../assets/icons/activity-active.svg";
import GraphInactive from "../assets/icons/activity.svg";
import CameraActive from "../assets/icons/camera-active.svg";
import CameraInactive from "../assets/icons/camera.svg";
import FoodIcon from "../assets/icons/food.svg";
import HomeActive from "../assets/icons/home-active.svg";
import HomeInactive from "../assets/icons/home.svg";
import ProfileActive from "../assets/icons/profile-active.svg";
import ProfileInactive from "../assets/icons/profile.svg";

export default function BottomNav() {
  const navItems = [
    {
      to: "/dashboard",
      label: "Home",
      icon: {
        active: HomeActive,
        inactive: HomeInactive,
      },
    },
    {
      to: "/dashboard/activity",
      label: "Graph",
      icon: {
        active: GraphActive,
        inactive: GraphInactive,
      },
    },
    {
      to: "/dashboard/camera",
      label: "Camera",
      icon: {
        active: CameraActive,
        inactive: CameraInactive,
      },
    },
    {
      to: "/dashboard/profile",
      label: "Profile",
      icon: {
        active: ProfileActive,
        inactive: ProfileInactive,
      },
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-x-0 bottom-10 flex justify-center z-50 pointer-events-auto">
        <button className="bg-primary-gradient w-16 h-16 rounded-full flex items-center justify-center shadow-xl pointer-events-auto">
          <img src={FoodIcon} alt="Food" className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white rounded-t-3xl shadow-[0_-4px_10px_rgba(0,0,0,0.1)] px-8 pt-6 pb-5 flex justify-between items-center">
        {navItems.slice(0, 2).map(({ to, icon }, i) => (
          <NavLink key={i} to={to} end={to === "/dashboard"}>
            {({ isActive }) => (
              <div className="flex flex-col items-center text-xs w-14">
                <img
                  src={isActive ? icon.active : icon.inactive}
                  alt=""
                  className="w-6 h-6 mb-1"
                />
                <div className="h-2 flex items-center justify-center">
                  {isActive ? (
                    <span className="w-1.5 h-1.5 bg-primary-gradient rounded-full" />
                  ) : (
                    <span className="w-1.5 h-1.5 invisible" />
                  )}
                </div>
              </div>
            )}
          </NavLink>
        ))}

        <div className="w-14" />

        {navItems.slice(2).map(({ to, icon }, i) => (
          <NavLink key={i + 2} to={to}>
            {({ isActive }) => (
              <div className="flex flex-col items-center text-xs w-14">
                <img
                  src={isActive ? icon.active : icon.inactive}
                  alt=""
                  className="w-6 h-6 mb-1"
                />
                <div className="h-2 flex items-center justify-center">
                  {isActive ? (
                    <span className="w-1.5 h-1.5 bg-primary-gradient rounded-full" />
                  ) : (
                    <span className="w-1.5 h-1.5 invisible" />
                  )}
                </div>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
