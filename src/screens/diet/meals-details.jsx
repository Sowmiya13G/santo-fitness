// packages
import "react-datepicker/dist/react-datepicker.css";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import Button from "@/components/button";
import AudioRecorderInput from "@/components/input/audio-input";
import Textarea from "@/components/input/text-area";
import UploadInput from "@/components/input/upload";
import ProfileWrapper from "@/components/profile-wrapper";

import Workout from "../../assets/images/panCake.svg";

const MealDetailsScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  const methods = useForm({
    // defaultValues: {
    //   clientName: null,
    //   file: null,
    // },
    // resolver: yupResolver(schema),
  });

  const {
    handleSubmit,

    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("clientId", data.clientName.value);
    formData.append("file", data.file[0]);

    // 👉 Replace this with actual API call
    try {
      // const res = await uploadReport(formData); // e.g., POST API
      navigate(-1); // Go back after success
    } catch (err) {
      console.error("Error submitting report:", err);
    }
  };
  return (
    <ProfileWrapper
      title=""
      image={Workout}
      bgColor="bg-red_25"
      // imgClass={"scale-150 rounded-none object-contain"}
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
            <Textarea name="comments" placeholder="Enter comment" />
            <AudioRecorderInput name="audio" />
          </form>
        </FormProvider>
        <div className="w-full bg-white absolute bottom-10 left-0 px-6">
          <Button
            label="Submit"
            onClick={() => navigate("/compare-progress")}
          />
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default MealDetailsScreen;
