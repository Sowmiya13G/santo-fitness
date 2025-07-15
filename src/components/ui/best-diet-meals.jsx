import AudioPlayer from "./audio-player";
import { Card } from "@/components/card/card";

const BestDietMeals = () => (
  <Card className="bg-pink-100 rounded-2xl p-4">
    <h3 className="text-sm font-semibold">Breakfast Recipe by Kamala</h3>
    <p className="text-xs text-gray-500">
      380 Calories | 20 g Protein | 5 g Fat | 10 g Fiber
    </p>
    <div className="mt-2 rounded-lg overflow-hidden">
      <img
        src="/example-meal.jpg"
        alt="Meal"
        className="w-full h-32 object-cover"
      />
    </div>
    <AudioPlayer />
  </Card>
);

export default BestDietMeals;
