import React, { useEffect } from "react";
// packages
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// components
import UserCard from "@/components/card/user-card";
import Dropdown from "@/components/input/dropdown";
import ScreenHeader from "@/components/screen-header";

import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import { FormProvider, useForm } from "react-hook-form";
import Breakfast from "../../assets/images/breakfast.svg";
import Dinner from "../../assets/images/dinner.svg";
import EveningSnack from "../../assets/images/evening-snacks.svg";
import Lunch from "../../assets/images/lunch-img.svg";
import MorningSnack from "../../assets/images/morning-snacks.svg";

const DietDetailsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, filter, fromMTracker } = location.state || {};
  const { userData } = useSelector((state) => state.auth);
  const methods = useForm();
  const { watch, setValue } = methods;
  const selectedUser = watch("person");

  const isClient = userData?.role === "client";
  const [mealsData, setMealsData] = React.useState([]);
  const { userList } = useSelector((state) => state.user);

  const fetchData = async () => {
    try {
      const formattedDate = format(
        fromMTracker ? filter?.date : new Date(),
        "yyyy-MM-dd"
      );
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
    mealsData[0]?.meals?.map((meal) => {
      return meal?.type;
    }) || [];

  const calorieSplit = {
    breakfast: 0.25,
    morning_snack: 0.1,
    lunch: 0.3,
    evening_snack: 0.1,
    dinner: 0.25,
  };

  const getUserData = isClient
    ? userData
    : userList.find((x) => x.value === selectedUser);

  const getSplitTargetData = (type) => {
    const cal = Math.round(getUserData?.targetCalories * calorieSplit[type]);
    const protein = Math.round(getUserData?.targetProtein * calorieSplit[type]);
    const carbs = Math.round(getUserData?.targetCarbs * calorieSplit[type]);
    const fat = Math.round(getUserData?.targetFat * calorieSplit[type]);

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
  useEffect(() => {
    if (userList) {
      setValue("person", userList[0]?.value);
    }
  }, [setValue, userList]);

  return (
    <div className="w-screen space-y-6 hide-scrollbar px-5 py-6 mb-10">
      <FormProvider {...methods}>
        <ScreenHeader title="Diet Details" />
        {userData.role !== "client" && !fromMTracker && (
          <Dropdown
            name="person"
            label="Select Client"
            options={userList}
            value={selectedUser}
            onChange={(val) => {
              setValue("person", val);
            }}
            placeholder="Select client"
          />
        )}
        {sections?.map((x, y) => {
          const isMealUploaded = availableMealTypes?.includes(x?.type);
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

          const navigateTo = isClient
            ? isMealUploaded
              ? "meals-details"
              : "meals-upload"
            : "meals-details";

          return (
            <UserCard
              user={{
                name: x?.label,
                goal: x?.targetData,
                profileImg: x?.image,
              }}
              key={y}
              onClick={() =>
                navigate(`/${navigateTo}?type=${x?.type}`, {
                  state: {
                    filter: fromMTracker
                      ? filter
                      : {
                          type: x?.type,
                          user: watch("person"),
                          date: format(new Date(), "yyyy-MM-dd"),
                        },
                  },
                })
              }
              isSwipe={false}
              buttonLabel={buttonLabel}
              customButtonClass={"!h-12 !w-auto py-3 text-sm font-normal"}
            />
          );
        })}
      </FormProvider>
    </div>
  );
};

export default DietDetailsScreen;
