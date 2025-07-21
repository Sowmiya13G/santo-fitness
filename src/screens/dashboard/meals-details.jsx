import ProfileWrapper from "@/components/profile-wrapper";
import { useLocation } from "react-router-dom";
import Workout from "../../assets/images/panCake.svg";

const MealsDetails = () => {
  const location = useLocation();
  const meals = location.state || [];
  console.log("meals: ", meals);
  return (
    <ProfileWrapper
      title=""
      image={Workout}
      bgColor="bg-red_25"
      imgClass={"scale-150  rounded-none object-contain"}
    >
      <div className="w-screen h-full px-5 py-4">
        <div className="space-y-6">
          {meals.map((meal) => (
            <div key={meal._id} className="  shadow-sm">
              <p className="text-lg font-semibold text-font_primary capitalize">
                {meal.type} - {meal.name}
              </p>

              <div className="flex overflow-x-auto space-x-3 mt-3 hide-scrollbar">
                {meal.images.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`Meal ${idx}`}
                    className="h-[200px] w-[100%] rounded-lg object-cover flex-shrink-0"
                  />
                ))}
              </div>

              <div className="mt-3 text-sm text-icon grid grid-cols-2 gap-y-1">
                <span>Calories: {meal.calories} kcal</span>
                <span>Protein: {meal.protein} g</span>
                <span>Carbs: {meal.carbs} g</span>
                <span>Fat: {meal.fat} g</span>
                <span>Fibre: {meal.fibre} g</span>
              </div>

              {/* Comment */}
              <div className="mt-3">
                <p className="text-sm italic text-gray-600">"{meal.comment}"</p>
              </div>

              {/* Voice Note */}
              {meal.voiceNote && (
                <div className="mt-4">
                  <audio controls src={meal.voiceNote} className="w-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default MealsDetails;
