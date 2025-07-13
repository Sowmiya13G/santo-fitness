import { Card } from "@/components/ui/card";
import Progress from "@/components/ui/diet-progress";

const ActivityCard = ({ label, value, left }) => (
  <Card className="rounded-xl p-3 text-sm">
    <p className="font-medium">{label}</p>
    <p className="text-red-500 font-bold">{value}</p>
    {left && <Progress value={50} className="mt-2" />}
  </Card>
);

export default ActivityCard;
