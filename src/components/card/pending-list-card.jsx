import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { Card } from "@/components/card/card";
import PendingAlert from "../../assets/images/pending-alert.svg"; // 🟡 Make sure the path is correct
import { useSelector } from "react-redux";

const PendingUserCard = ({ list }) => {
  return (
    <Card className="relative text-white !bg-primaryOpacity rounded-3xl p-4 shadow-lg w-full h-24 mb-4 overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="absolute w-16 h-16 bg-secondary opacity-20 rounded-full bottom-[-20px] left-[-20px]" />
      <div className="absolute w-10 h-10 bg-secondary opacity-20 rounded-full top-[-10px] right-[-10px]" />
      <div className="absolute w-3 h-3 bg-secondary opacity-20 rounded-full bottom-[10px] left-[30%]" />
      <div className="absolute w-3 h-3 bg-secondary opacity-20 rounded-full top-[10px] right-[40%]" />
      <div className="absolute w-3 h-3 bg-secondary opacity-20 rounded-full top-[30px] left-[20%]" />
      <div className="absolute w-3 h-3 bg-secondary opacity-20 rounded-full bottom-[30px] right-[40%]" />

      <div className="flex w-full justify-between h-full relative z-10">
        {/* Avatar */}
        <div className="w-[30%] flex justify-center items-center">
          <div className="bg-white relative rounded-full w-20 h-20 overflow-hidden p-4 ">
            <img
              src={PendingAlert}
              alt="Pending Icon"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-[70%] flex flex-col justify-center">
          <h2 className="text-sm text-gradient font-medium capitalize mb-1 animate-pulse">
            Pending !
          </h2>
          <p className="text-sm text-gray-600">
            {list.username} added a {list.type} at {list.date}{" "}
          </p>
        </div>
      </div>
    </Card>
  );
};

const PendingListCard = ({ label }) => {
  const { pendingLogsList } = useSelector((state) => state.dailyLogs);

  return (
    <div className="w-full px-2">
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <p className="text-gray-600 capitalize text-left">{label}</p>
          {pendingLogsList?.length && (
            <span className="text-xs bg-primary-gradient text-white px-2 py-0.5 rounded-full">
              {pendingLogsList?.length}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {pendingLogsList?.map((user) => (
          <PendingUserCard key={user.id} list={user} />
        ))}
      </div>
    </div>
  );
};

export default PendingListCard;
