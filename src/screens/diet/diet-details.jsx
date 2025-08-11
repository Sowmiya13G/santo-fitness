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
import Breakfast from "../../assets/images/Breakfast.svg";
import Dinner from "../../assets/images/dinner.svg";
import EveningSnack from "../../assets/images/evening-snacks.svg";
import Lunch from "../../assets/images/lunch-img.svg";
import MorningSnack from "../../assets/images/morning-snacks.svg";

const DietDetailsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.user);

  const methods = useForm();
  const { watch, setValue } = methods;

  const [mealsData, setMealsData] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  const { filter, fromMTracker } = location.state || {};
  const isClient = userData?.role === "client";
  const selectedUser = watch("person");

  const fetchData = async () => {
    try {
      const formattedDate = format(
        fromMTracker ? filter?.date : new Date(),
        "yyyy-MM-dd"
      );
      const type = fromMTracker ? filter?.type : "all";

      const params = {
        date: formattedDate,
        type,
        userId: fromMTracker ? filter?.user : selectedUser,
      };

      const res = await getDietProgress(params);
      setMealsData(res);
    } catch (error) {
      console.error("Failed to fetch diet data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    console.log("selectedUser: ", selectedUser);
    if (selectedUser) {
      fetchData();
    }
    if (isClient) {
      fetchData();
    }
  }, [selectedUser, userData?._id]);

  const availableMealTypes =
    mealsData[0]?.meals?.map((meal) => {
      return meal?.type;
    }) || [];

  const calorieSplit = {
    Breakfast: 0.25,
    MorningSnack: 0.1,
    Lunch: 0.3,
    EveningSnack: 0.1,
    Dinner: 0.25,
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
      type: "Breakfast",
      label: "Breakfast",
      targetData: getSplitTargetData("Breakfast"),
      image: Breakfast,
    },
    {
      type: "MorningSnack",
      label: "Morning Snack",
      targetData: getSplitTargetData("MorningSnack"),
      image: MorningSnack,
    },
    {
      type: "Lunch",
      label: "Lunch",
      targetData: getSplitTargetData("Lunch"),
      image: Lunch,
    },
    {
      type: "EveningSnack",
      label: "Evening Snack",
      targetData: getSplitTargetData("EveningSnack"),
      image: EveningSnack,
    },
    {
      type: "Dinner",
      label: "Dinner",
      targetData: getSplitTargetData("Dinner"),
      image: Dinner,
    },
  ];

  useEffect(() => {
    if (userList && !fromMTracker && !isClient) {
      setValue("person", userList[0]?.value);
    }
    if (fromMTracker) {
      setValue("person", filter.user);
    }
  }, [fromMTracker, setValue, userList]);

  return (
    <div className="w-screen space-y-6 hide-scrollbar px-2 py-6 mb-10">
      <FormProvider {...methods}>
        <ScreenHeader title="Diet Details" />
        {userData.role !== "client" && (
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
        {loading ? (
          <p className="text-center text-gray-500 text-base font-medium">
            Loading...
          </p>
        ) : (
          <div className={`space-y-4 animate-fade-in`}>
            {sections?.map((x, y) => {
              const isMealUploaded = availableMealTypes?.includes(x?.type);
              const mealForType = mealsData[0]?.meals?.find((meal) => {
                return meal?.type == x?.type;
              });
              const isNutrientAdded = mealForType?.isNutrientAdded;
              const buttonDisabled = isClient ? true : Boolean(mealForType);
              const buttonLabel = isClient
                ? isMealUploaded
                  ? "View Details"
                  : "Upload Meals Image"
                : !isClient
                ? !buttonDisabled
                  ? "Awaiting"
                  : isNutrientAdded
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
                  buttonDisabled={!buttonDisabled}
                  buttonLabel={buttonLabel}
                  customButtonClass={"!h-12 !w-auto py-3 text-sm font-normal"}
                />
              );
            })}
          </div>
        )}
      </FormProvider>
    </div>
  );
};

export default DietDetailsScreen;
