import { Card } from "@/components/card/card";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import { MdSwipe } from "react-icons/md";
import femaleProfile from "../../assets/images/femaleProfile.jpeg";
import maleProfile from "../../assets/images/maleProfile.jpeg";
import Button from "../button";

const UserCard = ({
  user,
  onClick,
  isSwipe = true,
  buttonLabel = "View",
  customButtonClass,
}) => {
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#adabb0");
  const [textColor, setTextColor] = useState("#0e0e0e");

  useEffect(() => {
    const fac = new FastAverageColor();
    const img = imgRef.current;

    const handleColor = async () => {
      try {
        const color = await fac.getColorAsync(img);
        setBgColor(color.hex);
        setTextColor(color.isDark ? "#fefefe" : "#0e0e0e");
      } catch (e) {
        console.error("Color extract failed:", e);
      }
    };

    if (img.complete) {
      handleColor();
    } else {
      img.addEventListener("load", handleColor);
      return () => img.removeEventListener("load", handleColor);
    }
  }, []);

  return (
    <div className="min-w-[100%] snap-center snap-always">
      <Card
        className={`${
          isSwipe ? "" : "py-6 h-[24%]"
        } relative text-white rounded-3xl p-4 shadow-lg w-full h-32 overflow-hidden`}
        style={{ backgroundColor: bgColor }}
      >
        {/* Decorative bubbles */}
        <div className="absolute w-24 h-24 bg-white/10 rounded-full bottom-[-30px] left-[-30px]" />
        <div className="absolute w-16 h-16 bg-white/20 rounded-full bottom-[-8px] right-[-10px]" />
        <div className="absolute w-3 h-3 bg-white/20 rounded-full bottom-[10px] left-[30%]" />
        <div className="absolute w-3 h-3 bg-white/20 rounded-full top-[10px] right-[40%]" />
        <div className="absolute w-3 h-3 bg-white/20 rounded-full top-[30px] left-[20%]" />
        <div className="absolute w-3 h-3 bg-white/20 rounded-full bottom-[30px] right-[40%]" />

        {/* Card content */}
        <div className="flex w-full justify-between h-full relative z-10">
          <div className="w-[70%]">
            <h2
              className="text-lg font-medium leading-tight mb-2 capitalize"
              style={{ color: textColor }}
            >
              {user?.name}
            </h2>
            <p
              className="text-xs  mb-2"
              style={{ color: textColor }}
            >
              {user?.goal}
            </p>
            <Button
              label={buttonLabel}
              onClick={onClick}
              customClassName={`${customButtonClass} bg-field_primary !text-font_primary opacity-70 w-auto !h-8 mb-0 mt-5`}
              buttonColor={`text-[${textColor}]`}
              variant=""
            />
          </div>

          {/* Swipe icon */}
          {isSwipe && (
            <MdSwipe className="w-5 h-5 absolute bottom-[5px] right-[50%] translate-x-1/2 animate-spin text-white/30" />
          )}

          <div className="w-[30%] text-center">
            <div className="bg-white relative rounded-full w-24 h-24 overflow-hidden mx-auto">
              <img
                ref={imgRef}
                src={
                  user.profileImg
                    ? user.profileImg
                    : user?.gender === "female"
                    ? femaleProfile
                    : maleProfile
                }
                alt={user?.name}
                crossOrigin="anonymous"
                className={`${
                  isSwipe ? "object-cover" : "object-fit"
                } rounded-full w-full h-full shadow-2xl`}
                style={{ objectPosition: "0% 0%" }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
