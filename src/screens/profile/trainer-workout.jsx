import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

import Button from "@/components/button";
import Workout from "../../assets/images/workout.svg";
// components
import Dropdown from "@/components/input/dropdown";
import Input from "@/components/input/input";
import ProfileWrapper from "@/components/profile-wrapper";
import { workoutClassData } from "@/constants/static-data";
import { getUsersList } from "@/features/user/user-api";


const TrainerWorkoutNotes = () => {
  // const navigate = useNavigate();
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
    <ProfileWrapper title="" image={Workout}>
      <div className="w-screen min-h-full px-5 py-4 flex flex-col">
        <p className="font-bold text-font_primary mb-2">Assign Workout</p>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
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
                  className="mt-2 text-sm font-medium text-gradient"
                >
                  + Add Exercise
                </button>
              )}
            </div>

            <div className="mb-8">
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
