import { Card } from "@/components/card/card";

const BMICard = ({ bmi }) => (
  <Card className="bg-gradient-to-r from-red-400 to-red-600 text-white rounded-2xl p-4 shadow-lg">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-sm font-medium">BMI (Body Mass Index)</h2>
        <p className="text-xs">You have a normal weight</p>
        <button className="mt-2 bg-white text-red-600 text-xs px-3 py-1 rounded-full shadow">View More</button>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{bmi}</div>
      </div>
    </div>
  </Card>
);

export default BMICard;
