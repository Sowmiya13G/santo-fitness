import React, { useEffect } from "react";
// packages
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// components
import UserCard from "@/components/card/user-card";
import ScreenHeader from "@/components/screen-header";

import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import Breakfast from "../../assets/images/breakfast.svg";
import Dinner from "../../assets/images/dinner.svg";
import EveningSnack from "../../assets/images/evening-snacks.svg";
import Lunch from "../../assets/images/lunch-img.svg";
import MorningSnack from "../../assets/images/morning-snacks.svg";

const DietDetailsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, filter } = location.state || {};
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const [mealsData, setMealsData] = React.useState([]);

  const fetchData = async () => {
    try {
      const formattedDate = format(filter?.date, "yyyy-MM-dd");
      const type = "all";

      const params = {
        date: formattedDate,
        type,
        userId: isClient ? userData?._id : filter?.user,
      };

      const res = await getDietProgress(params);
      setMealsData(res);
    } catch (error) {
      console.error("Failed to fetch diet data", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const availableMealTypes =
    mealsData[0]?.meals?.map((meal) => meal.type) || [];

  const calorieSplit = {
    breakfast: 0.25,
    morning_snack: 0.1,
    lunch: 0.3,
    evening_snack: 0.1,
    dinner: 0.25,
  };

  const getSplitTargetData = (type) => {
    const cal = userData?.targetCalories
      ? Math.round(userData?.targetCalories * calorieSplit[type])
      : 0;
    const protein = userData?.targetProtein
      ? Math.round(userData?.targetProtein * calorieSplit[type])
      : 0;
    const carbs = userData?.targetCarbs
      ? Math.round(userData?.targetCarbs * calorieSplit[type])
      : 0;
    const fat = userData?.targetFat
      ? Math.round(userData?.targetFat * calorieSplit[type])
      : 0;

    return `${cal} Calories | ${protein} Protein | ${carbs} Carbs | ${fat} Fat`;
  };

  const sections = [
    {
      type: "breakfast",
      label: "Breakfast",
      targetData: getSplitTargetData("breakfast"),
      image: Breakfast,
    },
    {
      type: "morning_snack",
      label: "Morning Snack",
      targetData: getSplitTargetData("morning_snack"),
      image: MorningSnack,
    },
    {
      type: "lunch",
      label: "Lunch",
      targetData: getSplitTargetData("lunch"),
      image: Lunch,
    },
    {
      type: "evening_snack",
      label: "Evening Snack",
      targetData: getSplitTargetData("evening_snack"),
      image: EveningSnack,
    },
    {
      type: "dinner",
      label: "Dinner",
      targetData: getSplitTargetData("dinner"),
      image: Dinner,
    },
  ];

  return (
    <div className="w-screen space-y-6 hide-scrollbar px-5 py-6 mb-10">
      <ScreenHeader title="Diet Details" />
      {sections?.map((x, y) => {
        const isMealUploaded = availableMealTypes.includes(x?.type);
        const mealForType = mealsData[0]?.meals?.find((meal) => {
          return meal?.type == x?.type;
        });
        const isNutrientAdded = mealForType?.isNutrientAdded;
        const buttonLabel = isClient
          ? isMealUploaded
            ? "View Details"
            : "Upload Meals Image"
          : !isClient
          ? isNutrientAdded
            ? "View Details"
            : "Review"
          : "View More";

        const navigateTo = isMealUploaded ? "meals-details" : "meals-upload";

        return (
          <UserCard
            user={{
              name: x?.label,
              goal: x?.targetData,
              profileImg: x?.image,
            }}
            key={y}
            onClick={() => navigate(`/${navigateTo}?type=${x?.type}`)}
            isSwipe={false}
            buttonLabel={buttonLabel}
            customButtonClass={"!h-12 !w-auto py-3 text-sm font-normal"}
          />
        );
      })}
    </div>
  );
};

export default DietDetailsScreen;
