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
import Input from "@/components/input/input";
import Textarea from "@/components/input/text-area";
import ProfileWrapper from "@/components/profile-wrapper";

import {
  createDailyLogs,
  getDietProgress,
} from "@/features/daily-logs/daily-logs-api";
import { getMealsLabel } from "@/utils/helper";
import { nutrientsValidationSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import Workout from "../../assets/images/panCake.svg";
import { showToast } from "@/components/toast";

const MealDetailsScreen = () => {
  const { userData } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const methods = useForm({
    resolver: yupResolver(nutrientsValidationSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [mealsData, setMealsData] = React.useState([]);

  const isClient = userData?.role === "client";
  const type = query.get("type");
  const { data, filter } = location.state || {};
  const isNutrientAdded = mealsData[0]?.meals[0]?.isNutrientAdded;

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
        calories: Number(data?.kcal),
        protein: Number(data?.protein),
        carbs: Number(data?.carbs),
        fat: Number(data?.fat),
        comment: data.comment,
        isNutrientAdded: true,
        targetId: filter?.user,
      };
      const result = await createDailyLogs(payload);
      if (result?.status === 200) {
        setLoading(false);
        showToast("success", "Meals Nutrients Added Successfully!");
        navigate(-1);
      }
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
          {!isClient
            ? isNutrientAdded
              ? "Nutrients count:"
              : "Update Nutrients count"
            : "Trainer Comment :"}
        </p>
        <div className="w-full flex space-x-4 mt-4">
          <Input
            name={"protein"}
            label={"Protein"}
            placeholder={`Enter protein`}
            type="numeric"
            editable={isNutrientAdded ? false : true}
          />
          <Input
            name={"fat"}
            label={"Fat"}
            placeholder={`Enter fat`}
            type="numeric"
            editable={isNutrientAdded ? false : true}
          />
        </div>
        <div className="w-full flex space-x-4 mt-4">
          <Input
            name={"kcal"}
            label={"KCal"}
            placeholder={`Enter kcal`}
            type="numeric"
            editable={isNutrientAdded ? false : true}
          />
          <Input
            name={"carbs"}
            label={"Carbs"}
            placeholder={`Enter carbs`}
            type="numeric"
            editable={isNutrientAdded ? false : true}
          />
        </div>
        <Textarea
          name={"comment"}
          label={"Comment"}
          placeholder={`Enter comment`}
          editable={isNutrientAdded ? false : true}
        />
        {!isClient && !isNutrientAdded && (
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
