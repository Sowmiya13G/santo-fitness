// packages
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

// components
import Button from "@/components/button";
import ScreenHeader from "@/components/screen-header";
import ProfileWrapper from "@/components/profile-wrapper";
import Workout from "../../assets/images/panCake.svg";
import UploadInput from "@/components/input/upload";

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
      <div className="w-screen h-full px-5 py-4">
        <p className="text-icon text-sm text-center">
          focus on regular physical activity, a balanced diet, sufficient sleep,
          and stress management
        </p>
        <p className="text-font_primary text-base font-medium text-center">
          focus on regular physical activity, a balanced diet, sufficient sleep,
          and stress management
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 pb-10"
            encType="multipart/form-data"
          >
            <UploadInput
              name="file"
              label="Upload Report (PDF, PNG, JPG)"
              accept=".pdf,.png,.jpg,.jpeg"
              // error={errors.file?.message}placeholder
              placeholder={"Upload Image"}
            />
          </form>
        </FormProvider>
        <div className="w-full absolute bottom-10 left-0 px-6">
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
