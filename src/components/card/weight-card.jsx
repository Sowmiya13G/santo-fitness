import { Card } from "@/components/card/card";
import GaugeChart from "react-gauge-chart";

const getWeightStatus = (weight) => {
  if (weight < 50) return "Underweight";
  if (weight < 80) return "Healthy Range";
  if (weight < 100) return "Overweight";
  return "Obese";
};

const WeightCard = ({ weight, min = 40, max = 120 }) => {
  // Normalize weight into 0–1 range
  const range = max - min;
  const percent = Math.min(Math.max((weight - min) / range, 0), 1);
  const status = getWeightStatus(weight);

  return (
    <Card className="bg-primary-gradient text-white rounded-2xl p-4 shadow-lg w-full h-32">
      <div className="flex  items-center justify-between h-full relative">
        {/* Title & Status */}
        <div className="w-[40%] text-center mb-2">
          <h2 className="text-base font-medium leading-tight">Weight Scale</h2>
          <p className="text-xs">{status}</p>
        </div>

        {/* Gauge Scale */}
        <div className="w-[50%]">
          <GaugeChart
            id="weight-scale"
            nrOfLevels={30}
            arcPadding={0.01}
            percent={percent}
            colors={["#fefefe"]}
            arcWidth={0.2}
            needleColor="#ffffff"
            needleBaseColor="#ffffff"
            textColor="#ffffff"
            animate={true}
            hideText={true}
          />

          <p className="text-md font-bold text-center mt-1">{weight} kg</p>
        </div>
      </div>
    </Card>
  );
};

export default WeightCard;
