import React, { useEffect, useState } from "react";
// packages
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// components
import Button from "@/components/button";
import AudioRecorderInput from "@/components/input/audio-input";
import ProfileWrapper from "@/components/profile-wrapper";
import { showToast } from "@/components/toast";

import {
  createDailyLogs,
  getDietProgress,
} from "@/features/daily-logs/daily-logs-api";
import { getMealsLabel } from "@/utils/helper";
import Workout from "../../assets/images/panCake.svg";

const MealDetailsScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();
  const location = useLocation();

  const { data, filter } = location.state || {};
  console.log("data: ", data);
  const methods = useForm({});

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const query = new URLSearchParams(location.search);
  const type = query.get("type");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [mealsData, setMealsData] = React.useState([]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const formattedDate = format(filter?.date, "yyyy-MM-dd");

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
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        type: type,
        calories: Number(userData?.targetCalories),
        protein: Number(userData?.targetProtein),
        carbs: Number(userData?.targetCarbs),
        fat: Number(userData?.targetFat),
        comment: data.comments,
        isNutrientAdded: true,
      };
      console.log("payload: ", payload);

      // const result = await createDailyLogs(payload);
      // if (result?.status === 200) {
      //   setLoading(false);
      //   showToast("success", "Meals Review Added Successfully!");
      //   navigate(-1);
      // }
    } catch (err) {
      console.error("Submission failed:", err);
      setLoading(false);
    }
  };

  const renderClientData = () => {
    return (
      <div className="flex-col">
        <p className="text-base text-black font-medium mt-4">
          {isClient ? "Uploaded Images :" : "Client Uploaded Images :"}
        </p>

        <div className="relative overflow-x-auto flex gap-4 scroll-smooth no-scrollbar mb-4">
          {mealsData[0]?.meals[0]?.images?.map((x, y) => (
            <div key={y} className="relative  flex min-w-[250px] max-w-[250px]">
              <img
                src={x}
                alt={"img"}
                className="rounded-lg object-fit w-full h-48"
              />
            </div>
          ))}
        </div>

        <p className="text-base text-black font-medium mb-4">
          {isClient ? "Your Comment :" : "Client Comment :"}
          <span className="text-normal">
            {" "}
            {mealsData[0]?.meals[0]?.comment ?? "--"}
          </span>
        </p>

        <p className="text-base text-black font-medium mb-2">
          {isClient ? "Your Voice Note :" : "Client Voice Note :"}
        </p>
        <AudioRecorderInput value={mealsData[0]?.meals[0]?.voiceNote} />
      </div>
    );
  };

  const renderReviewData = () => {
    return (
      <div className="flex-col">
        <p className="text-base text-black font-medium">
          {!isClient ? "Your Comment :" : "Trainer Comment :"}
          <span className="text-normal">
            {" "}
            {mealsData[0]?.meals[0]?.comment}
          </span>
        </p>
        <AudioRecorderInput value={mealsData[0]?.meals[0]?.voiceNote} />
        {!isClient && (
          <div className="w-full bg-white absolute pb-8 pt-2 bottom-0 left-0 px-6">
            <Button label="Submit" loading={loading} type="submit" />
          </div>
        )}
      </div>
    );
  };

  const renderContentTrainer = () => {
    return (
      <>
        {renderClientData()}
        {renderReviewData()}
      </>
    );
  };

  const renderContentClient = () => {
    return (
      <>
        {renderReviewData()}
        {renderClientData()}
      </>
    );
  };
  return (
    <ProfileWrapper
      title=""
      image={Workout}
      bgColor="bg-red_25"
      imgClass={"scale-150 rounded-none object-contain"}
    >
      <div className="w-screen min-h-screen px-5 py-4">
        {loadingData ? (
          <p className="text-center text-base font-medium text-icon">
            Loading..!
          </p>
        ) : (
          <>
            <p className="text-black text-base text-center font-medium">
              {isClient
                ? `Your ${getMealsLabel(type)} Detials`
                : `Your ${getMealsLabel(type)} Detials`}
            </p>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={"flex-col space-y-6 pb-10 mb-3"}
                encType="multipart/form-data"
              >
                {isClient ? renderContentClient() : renderContentTrainer()}
              </form>
            </FormProvider>
          </>
        )}
      </div>
    </ProfileWrapper>
  );
};

export default MealDetailsScreen;
