import { Card } from "@/components/card/card";

const getHeightStatus = (height) => {
  if (height < 150) return "Short";
  if (height < 175) return "Average";
  if (height < 190) return "Tall";
  return "Very Tall";
};

const HeightCard = ({ height }) => {
  const status = getHeightStatus(height);

  return (
    <Card className="bg-primary-gradient text-white rounded-2xl p-4 shadow-lg w-full h-32">
      <div className="flex relative w-full items-center justify-between h-full">
        {/* Decorative Background Circles */}
        <div className="absolute w-16 h-16 bg-gray-200 opacity-20 rounded-full bottom-[-20px] left-[-20px]" />
        <div className="absolute w-10 h-10 bg-gray-200 opacity-20 rounded-full top-[-10px] right-[-10px]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full bottom-[10px] left-[30%]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full top-[10px] right-[40%]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full top-[30px] left-[20%]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full bottom-[30px] right-[40%]" />

        {/* Left Section */}
        <div className="w-[70%]">
          <h2 className="text-xl font-medium leading-tight mb-1">Height</h2>
          <p className="text-sm leading-none mb-2">{status}</p>
        </div>

        {/* Right Section (Value) */}
        <div className="w-[30%] text-center flex items-end">
          <div className="text-xl font-bold">{height}cm</div>
        </div>
      </div>
    </Card>
  );
};

export default HeightCard;
