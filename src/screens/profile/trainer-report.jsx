import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// components
import Button from "@/components/button";
import Dropdown from "@/components/input/dropdown";
import UploadInput from "@/components/input/upload";
import ScreenHeader from "@/components/screen-header";
import { getUsersList } from "@/features/user/user-api";

// ✅ Yup validation schema
const schema = yup.object().shape({
  clientName: yup.object().required("Client name is required"),
  file: yup
    .mixed()
    .required("A file is required")
    .test("fileType", "Only PDF, PNG, JPG allowed", (value) => {
      if (!value || !value.length) return false;
      const file = value[0];
      return ["application/pdf", "image/png", "image/jpeg"].includes(file.type);
    }),
});

const TrainerPostReport = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);

  const methods = useForm({
    defaultValues: {
      clientName: null,
      file: null,
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  // Fetch client list
  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await getUsersList("client");
        if (response?.status === 200) {
          const res = response.users.map((x) => ({
            value: x._id,
            label: x.name,
          }));
          setClientList(res);
        }
      } catch (err) {
        console.error("Failed to fetch clients list:", err);
      }
    };

    fetchUsersList();
  }, []);

  // Submit handler
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
    <div className="h-full w-screen bg-white space-y-6 px-4 py-5">
      <ScreenHeader title="Reports" isBack titleColor="text-black" />
      <div className="h-[90%]  relative pt-6">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 pb-10"
            encType="multipart/form-data"
          >
            {/* Dropdown */}
            <Dropdown
              name="clientName"
              label="Client Name"
              options={clientList}
              value={watch("clientName")}
              onChange={(val) => setValue("clientName", val)}
              placeholder="Select client"
              error={errors.clientName?.message}
            />

            {/* File Upload */}
            <UploadInput
              name="file"
              label="Upload Report (PDF, PNG, JPG)"
              accept=".pdf,.png,.jpg,.jpeg"
              error={errors.file?.message}
            />

            {/* Submit Button */}
            <div className="absolute bottom-0 w-full">
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                label="Create"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TrainerPostReport;
