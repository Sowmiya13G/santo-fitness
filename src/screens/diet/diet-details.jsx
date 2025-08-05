// packages
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import UserCard from "@/components/card/user-card";
import ScreenHeader from "@/components/screen-header";

import Breakfast from "../../assets/images/breakfast.svg";
import Dinner from "../../assets/images/dinner.svg";
import EveningSnack from "../../assets/images/evening-snacks.svg";
import Lunch from "../../assets/images/lunch-img.svg";
import MorningSnack from "../../assets/images/morning-snacks.svg";

const DietDetailsScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  const sections = [
    {
      type: "breakfast",
      label: "Breakfast",
      targetData: `${userData?.targetCalories} Calories | ${userData?.targetProtein} Protein | ${userData?.targetCarbs} Carbs | ${userData?.targetFat} Fat `,
      image: Breakfast,
      onClick: "",
    },
    {
      type: "morning_snack",
      label: "Morning Snack",
      targetData: `${userData?.targetCalories} Calories | ${userData?.targetProtein} Protein | ${userData?.targetCarbs} Carbs | ${userData?.targetFat} Fat `,
      image: MorningSnack,
      onClick: "",
    },
    {
      type: "lunch",
      label: "Lunch",
      targetData: `${userData?.targetCalories} Calories | ${userData?.targetProtein} Protein | ${userData?.targetCarbs} Carbs | ${userData?.targetFat} Fat `,
      image: Lunch,
      onClick: "",
    },
    {
      type: "evening_snack",
      label: "evening Snack",
      targetData: `${userData?.targetCalories} Calories | ${userData?.targetProtein} Protein | ${userData?.targetCarbs} Carbs | ${userData?.targetFat} Fat `,
      image: EveningSnack,
      onClick: "",
    },
    {
      type: "dinner",
      label: "Dinner",
      targetData: `${userData?.targetCalories} Calories | ${userData?.targetProtein} Protein | ${userData?.targetCarbs} Carbs | ${userData?.targetFat} Fat `,
      image: Dinner,
      onClick: "",
    },
  ];
  return (
    <div className="w-screen space-y-6 hide-scrollbar px-5 py-6">
      <ScreenHeader title="Diet Details" />
      {sections?.map((x, y) => (
        <UserCard
          user={{
            name: x?.label,
            goal: x?.targetData,
            profileImg: x?.image,
          }}
          key={y}
          onClick={() => navigate(`/meals-details?type=${x?.type}`)}
          isSwipe={false}
          buttonLabel={isClient ? "Upload Meals Image" : "View More"}
          customButtonClass={"!h-10 !w-auto py-3"}
        />
      ))}
    </div>
  );
};

export default DietDetailsScreen;
