import { getColorFromLetter } from "@/utils/helper";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";

const UserCard = ({ user }) => {
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#fefefe");
  const [textColor, setTextColor] = useState("#0e0e0e");

  useEffect(() => {
    if (!user?.profileImg) {
      // No profile → use letter-based color
      const letterColor = getColorFromLetter(
        user?.name?.[0]?.toUpperCase() || "A"
      ).dark;
      console.log("letterColor: ", letterColor);
      setBgColor(letterColor);
      setTextColor("#ffffff");
      return;
    }

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

    if (img?.complete) {
      handleColor();
    } else {
      img?.addEventListener("load", handleColor);
      return () => img?.removeEventListener("load", handleColor);
    }
  }, [user]);

  return (
    <div
      className="max-w-[90px] h-full relative snap-center rounded-lg flex flex-col space-y-1 p-1"
      style={{ backgroundColor: `${bgColor}` }}
    >
      {/* Decorative bubbles */}
      <div className="absolute w-24 h-24 bg-white/10 rounded-full top-[-30px] left-[-30px]" />
      <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-[-30px] right-[-15px]" />

      {/* Avatar */}
      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-gray-200">
        {user?.profileImg ? (
          <img
            ref={imgRef}
            src={user.profileImg}
            crossOrigin="anonymous"
            alt={user.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: "0% 0%" }}
          />
        ) : (
          <span
            className="text-lg font-bold text-white"
            style={{
              backgroundColor: getColorFromLetter(
                user?.name?.[0]?.toUpperCase() || "A"
              ).base,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p className="text-3xl font-bold text-gray-700 ">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </p>
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="text-xs text-center truncate"
        style={{ color: textColor }}
      >
        {user.name}
      </span>

      {/* Progress */}
      <span className="text-center text-xs" style={{ color: textColor }}>
        {Math.abs(user.avgProgress)}%
      </span>
    </div>
  );
};

const RankCard = ({ label, data = [] }) => {
  const hasData = data.length > 0;

  return (
    <>
      <p className="text-gray-600 capitalize text-center">{label}</p>

      {hasData ? (
        <div className="flex gap-4 overflow-x-scroll overflow-hidden hide-scrollbar space-y-0 snap-x snap-mandatory">
          {data.map((user) => (
            <UserCard key={user.userId} user={user} />
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

export default RankCard;
