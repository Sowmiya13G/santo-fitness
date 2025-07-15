import { Card } from "@/components/card/card";

const getBMRStatus = (bmr) => {
  if (bmr < 1400) return "Low BMR";
  if (bmr < 1800) return "Average BMR";
  return "High BMR";
};

const BMRCard = ({ bmr }) => {
  const status = getBMRStatus(bmr);

  return (
    <Card className="bg-primary-gradient text-white rounded-2xl p-4 shadow-lg w-full h-24">
      <div className="flex w-full items-center justify-between h-full">
        <div className="w-[70%]">
          <h2 className="text-base font-medium leading-tight mb-1">
            BMR (Basal Metabolic Rate)
          </h2>
          <p className="text-xs leading-none mb-2">{status}</p>
        </div>
        <div className="w-[30%] text-center">
          <div className="text-2xl font-bold">{Math.round(bmr)}</div>
          <p className="text-[10px] mt-1 leading-none">kcal/day</p>
        </div>
      </div>
    </Card>
  );
};

export default BMRCard;
