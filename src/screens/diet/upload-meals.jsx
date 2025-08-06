import { useState } from "react";
// packages
import "react-datepicker/dist/react-datepicker.css";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Button from "@/components/button";
import AudioRecorderInput from "@/components/input/audio-input";
import Input from "@/components/input/input";
import Textarea from "@/components/input/text-area";
import UploadInput from "@/components/input/upload";
import ProfileWrapper from "@/components/profile-wrapper";

import { uploadFile } from "@/features/user/user-api";
import Workout from "../../assets/images/panCake.svg";
import { createDailyLogs } from "@/features/daily-logs/daily-logs-api";
import { showToast } from "@/components/toast";

const UploadMealsScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  const methods = useForm({});

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const query = new URLSearchParams(location.search);
  const type = query.get("type");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        type: type,
        name: data.name,
        calories: Number(userData?.targetCalories),
        protein: Number(userData?.targetProtein),
        carbs: Number(userData?.targetCarbs),
        fat: Number(userData?.targetFat),
        // fibre: Number(userData?.targetFibre),
        comment: data.comments,
        images: [],
        voiceNote: null,
      };

      if (Array.isArray(data.file) && data.file.length > 0) {
        const imageForm = new FormData();
        data.file.forEach((file) => imageForm.append("files", file));
        const imageUploadRes = await uploadFile(imageForm);
        payload.images = imageUploadRes?.urls || [];
      }

      if (
        data.audio &&
        (data.audio instanceof Blob || typeof data.audio === "object")
      ) {
        const audioBlob =
          data.audio instanceof Blob
            ? data.audio
            : new Blob([data.audio], {
                type: data?.audio?.type || "audio/mpeg",
              });
        const audioFile = new File([audioBlob], "recording.webm", {
          type: "audio/mpeg",
          lastModified: Date.now(),
        });

        const audioForm = new FormData();
        audioForm.append("files", audioFile);
        const audioUploadRes = await uploadFile(audioForm);
        payload.voiceNote = audioUploadRes?.urls?.[0] || null;
      }

      const result = await createDailyLogs(payload);
      if (result?.status === 200) {
        setLoading(false);
        showToast("success","Meals Uploaded Successfully!")
        navigate(-1);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setLoading(false);
    }
  };

  return (
    <ProfileWrapper
      title=""
      image={Workout}
      bgColor="bg-red_25"
      imgClass={"!scale-175 rounded-none object-contain top-[25px] absolute"}
    >
      <div className="w-screen min-h-screen px-5 py-4">
        <p className="text-icon text-sm text-center">
          focus on regular physical activity, a balanced diet, sufficient sleep,
          and stress management
        </p>
        <p className="text-font_primary text-base font-medium text-center my-5">
          focus on regular physical activity, a balanced diet, sufficient sleep,
          and stress management
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 pb-10 mb-3"
            encType="multipart/form-data"
          >
            <UploadInput
              name="file"
              label="Upload Report (PDF, PNG, JPG)"
              accept=".pdf,.png,.jpg,.jpeg"
              placeholder={"Upload Image"}
              isArray
              type="meals"
            />
            <Input
              name="name"
              placeholder="Enter recipe name"
              label="Recipe Name"
            />
            <Textarea
              name="comments"
              placeholder="Enter comment"
              label="Comments"
            />
            <AudioRecorderInput name="audio" />
            <div className="h-8" />
            <div className="w-full bg-white absolute pb-8 pt-2 bottom-0 left-0 px-6">
              <Button label="Submit" loading={loading} type="submit" />
            </div>
          </form>
        </FormProvider>
      </div>
    </ProfileWrapper>
  );
};

export default UploadMealsScreen;
