import { Card } from "@/components/card/card";
import GaugeChart from "react-gauge-chart";

const getBMIStatus = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

const BMICard = ({ bmi }) => {
  const percent = Math.min(bmi / 40, 1); // scale to 0–1
  const status = getBMIStatus(bmi);

  return (
    <Card className="bg-primary-gradient text-white rounded-2xl p-4 shadow-lg w-full h-32">
      <div className="flex relative w-full  items-center justify-between h-full">
        <div className="absolute w-16 h-16 bg-gray-200 opacity-20 rounded-full bottom-[-20px] left-[-20px]" />
        <div className="absolute w-10 h-10 bg-gray-200 opacity-20 rounded-full top-[-10px] right-[-10px]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full bottom-[10px] left-[30%]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full top-[10px] right-[40%]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full top-[30px] left-[20%]" />
        <div className="absolute w-3 h-3 bg-gray-200 opacity-20 rounded-full bottom-[30px] right-[40%]" />
        <div className="w-[70%]">
          <h2 className="text-base font-medium leading-tight mb-1">
            BMI {bmi} (Body Mass Index)
          </h2>
          <p className="text-xs leading-none mb-2">{status}</p>
        </div>
        <div className="w-[30%]  ">
          <GaugeChart
            id="bmi-gauge"
            nrOfLevels={40}
            percent={percent}
            arcsLength={[0.25, 0.25, 0.25, 0.25]}
            colors={["#FF6B6B", "#4ADE80", "#FACC15", "#F97316"]}
            arcPadding={0.02}
            needleColor="#ffffff"
            needleBaseColor="#ffffff"
            textColor="#ffffff"
            formatTextValue={() => `${bmi}`}
            animate={true}
            hideText={true}
          />
        </div>
      </div>
    </Card>
  );
};

export default BMICard;
