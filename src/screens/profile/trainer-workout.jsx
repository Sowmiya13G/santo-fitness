import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// components 
import Button from "@/components/button";
import InputDatePicker from "@/components/input/date-picker";
import Dropdown from "@/components/input/dropdown";
import Input from "@/components/input/input";
import ProfileWrapper from "@/components/profile-wrapper";
import { showToast } from "@/components/toast";

// others
import { workoutClassData } from "@/constants/static-data";
import { getUsersList } from "@/features/user/user-api";
import { createWorkout } from "@/features/workout/workout-api";
import Workout from "../../assets/images/workout.svg";

const TrainerWorkoutNotes = () => {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);

  const methods = useForm({
    defaultValues: {
      exercises: [],
    },
    // resolver: yupResolver(),
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

  const onSubmit = async (data) => {
    const formatted = `${data?.workoutDate.getFullYear()}-${String(
      data?.workoutDate.getMonth() + 1
    ).padStart(2, "0")}-${String(data?.workoutDate.getDate()).padStart(
      2,
      "0"
    )}`;

    const payload = {
      clientId: data?.clientName,
      workoutName: data?.workoutClass,
      workoutDate: formatted,
      workoutVariation: data?.exercises?.map((x) => ({
        variationName: x?.value,
        sets: data?.set,
        reps: data?.rep,
        weight: "25kg",
      })),
      notes: "Focus on upper chest",
    };

    const response = await createWorkout(payload);
    if (response?.status === 201) {
      showToast("success", response?.message);
      navigate("/profile");
    }
  };

  return (
    <ProfileWrapper title="" image={Workout}>
      <div className="w-screen h-full px-5 py-5 flex flex-col">
        <p className="font-bold text-font_primary mb-2">Assign Workout</p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col flex-1 justify-between"
          >
            <div className="space-y-4">
              <Dropdown
                name="clientName"
                label="Client Name"
                options={clientList}
                value={watch("clientName")}
                onChange={(val) => setValue("clientName", val)}
                placeholder="Select client name"
              />
              <InputDatePicker name="workoutDate" label="Workout Date" />
              <Dropdown
                name="workoutClass"
                label="Workout Class"
                options={workoutClassData}
                value={watch("workoutClass")}
                onChange={(val) => {
                  setValue("workoutClass", val);
                  setValue("exercises", []);
                }}
                placeholder="Select workout class"
              />
              <Input
                name="set"
                placeholder="Enter set"
                label="Set"
                type="number"
              />
              <Input
                name="rep"
                placeholder="Enter rep"
                label="Rep"
                type="number"
              />
              {selectedWorkoutClass &&
                fields.map((field, index) => (
                  <Input
                    key={field.id}
                    name={`exercises.${index}.value`}
                    placeholder="Enter exercise"
                    label={`Exercise ${index + 1}`}
                    icon={<FaTrash />}
                    iconPosition="suffix"
                    suffixIconAction={() => handleDeleteExercise(index)}
                  />
                ))}
              {selectedWorkoutClass && (
                <button
                  type="button"
                  onClick={handleAddExercise}
                  className="mt-8 text-sm font-medium text-gradient"
                >
                  + Add Exercise
                </button>
              )}
            </div>

            <div className="w-full mt-8 mb-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                label={"Create"}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </ProfileWrapper>
  );
};

export default TrainerWorkoutNotes;
