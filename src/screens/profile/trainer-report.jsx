import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getUsersList } from "@/features/user/userAPI";
// components
import Button from "@/components/Button";
import Dropdown from "@/components/input/dropdown";
import UploadInput from "@/components/input/upload";
import ScreenHeader from "@/components/screen-header";

const TrainerPostReport = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);

  const methods = useForm({
    defaultValues: {
      exercises: [],
    },
    resolver: yupResolver(),
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const selectedWorkoutClass = watch("workoutClass");

  const fetchUsersList = async () => {
    try {
      const response = await getUsersList("client");
      if (response?.status === 200) {
        const res = response?.users?.map((x) => ({
          value: x?._id,
          label: x?.name,
        }));
        setClientList(res);
      }
    } catch (err) {
      console.error("Failed to fetch clients list:", err);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  const handleAddExercise = () => {
    append({ value: "" });
  };

  const handleDeleteExercise = (index) => {
    remove(index);
  };

  return (
    <div className="w-screen min-h-fullflex flex-col">
      <ScreenHeader title={"Reports"} isBack titleColor="text-black" />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="flex flex-col flex-1 space-y-4  px-5 py-5  justify-between"
        >
          <Dropdown
            name="clientName"
            label="Client Name"
            options={clientList}
            value={watch("clientName")}
            onChange={(val) => setValue("clientName", val)}
            placeholder="Select client name"
          />
          <UploadInput name="file" label="Upload Document" />
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            label={"Create"}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default TrainerPostReport;
