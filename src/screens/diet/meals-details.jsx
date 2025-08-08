import React, { useEffect, useState } from "react";
// packages
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { FaDownload } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// components
import Button from "@/components/button";
import AudioRecorderInput from "@/components/input/audio-input";
import Input from "@/components/input/input";
import Textarea from "@/components/input/text-area";
import ProfileWrapper from "@/components/profile-wrapper";
import { showToast } from "@/components/toast";
// others
import {
  createDailyLogs,
  getDietProgress,
} from "@/features/daily-logs/daily-logs-api";
import { getMealsLabel } from "@/utils/helper";
import { nutrientsValidationSchema } from "@/utils/validation";
import Workout from "../../assets/images/panCake.svg";

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
    reset,
  } = methods;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [mealsData, setMealsData] = React.useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isClient = userData?.role === "client";
  const type = query.get("type");
  const { data, filter } = location.state || {};
  const isNutrientAdded = mealsData[0]?.meals[0]?.isNutrientAdded;

  // ------------------------------------- functionalities ------------------------------------- //

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : mealsData[0]?.meals[0]?.images.length - 1
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < mealsData[0]?.meals[0]?.images.length - 1 ? prev + 1 : 0
    );
  };

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" }); // ensures blob access
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectURL;
      link.download = `progress-${selectedImageIndex + 1}.jpg`; // or .png if appropriate
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL); // clean up memory
    } catch (error) {
      console.error("Image download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

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
      const data = res[0]?.meals[0];
      if (data?.isNutrientAdded) {
        reset({
          kcal: data?.calories ?? "",
          protein: data?.protein ?? "",
          carbs: data?.carbs ?? "",
          fat: data?.fat ?? "",
          comment: data.comment,
        });
      }
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
        <p className="text-base text-black font-medium mt-4 mb-3">
          {isClient ? "Uploaded Images" : "Client Uploaded Images"}
        </p>

        <div className="relative overflow-x-auto flex gap-4 scroll-smooth no-scrollbar mb-4">
          {mealsData[0]?.meals[0]?.images?.map((x, y) => (
            <div
              key={y}
              onClick={() => openModal(y)}
              className="relative  flex min-w-[250px] max-w-[250px]"
            >
              <img
                src={x}
                alt={"img"}
                className="rounded-lg object-contain w-full h-48"
              />
            </div>
          ))}
        </div>
        <p className="text-base text-black font-medium mb-2">
          {isClient ? "Your Voice Note" : "Client Voice Note"}
          <span className="text-normal">
            {" "}
            {mealsData[0]?.meals[0]?.voiceNote ? "" : "--"}
          </span>
        </p>

        {mealsData[0]?.meals[0]?.voiceNote && (
          <AudioRecorderInput value={mealsData[0]?.meals[0]?.voiceNote} />
        )}
      </div>
    );
  };

  const renderReviewData = () => {
    return (
      <div className="flex-col">
        <p className="text-base text-black font-medium">
          {!isClient
            ? isNutrientAdded
              ? "Nutrients count"
              : "Update Nutrients count"
            : "Trainer Comment "}
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
        <div className="w-full flex space-x-4 mt-4 mb-4">
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
      imgClass={"!scale-175 rounded-none object-contain top-[25px] absolute"}
    >
      <div className="w-screen min-h-screen px-5 py-4">
        {loadingData ? (
          <p className="text-center text-base font-medium text-icon">
            Loading..!
          </p>
        ) : (
          <>
            <p className="text-black text-base text-center font-medium mb-2">
              {`${getMealsLabel(type)} Detials`}
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
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative max-w-3xl w-full mx-4 bg-white p-4 rounded-xl">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="absolute top-5 right-5 text-gray-600 bg-white p-1 rounded-full w-10 h-10 hover:text-black text-xl font-bold"
                  >
                    <IoIosClose className="text-3xl" />
                  </button>

                  <img
                    src={mealsData[0]?.meals[0]?.images[selectedImageIndex]}
                    alt={`Progress ${selectedImageIndex + 1}`}
                    className="w-full max-h-[70vh] object-contain rounded"
                  />

                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <IoIosArrowBack className="text-xl" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <IoIosArrowForward className="text-xl" />
                  </button>

                  <button
                    onClick={() =>
                      downloadImage(
                        mealsData[0]?.meals[0]?.images[selectedImageIndex]
                      )
                    }
                    className="absolute bottom-0 right-0  bg-white px-3 py-2 rounded-full  flex items-center gap-2"
                  >
                    <FaDownload />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ProfileWrapper>
  );
};

export default MealDetailsScreen;
