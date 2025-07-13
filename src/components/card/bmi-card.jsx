import { Card } from "@/components/card/card";
import GaugeChart from "react-gauge-chart";
import Button from "../Button";

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
    <Card className="bg-primary-gradient text-white rounded-2xl p-4 shadow-lg w-full h-24">
      <div className="flex w-full  items-center justify-between h-full">
        <div className="w-[70%]">
          <h2 className="text-base font-medium leading-tight mb-1">
            BMI (Body Mass Index)
          </h2>
          <p className="text-xs leading-none mb-2">{status}</p>
          {/* <Button
            onClick={() => {}}
            label="View More"
            variant=""
            customClassName="p-0 h-8 w-[44%] mt-6 text-xs"
          /> */}
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
