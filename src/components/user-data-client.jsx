import { useCallback, useEffect, useState } from "react";
//packages
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import InputDatePicker from "./input/date-picker";
import Dropdown from "./input/dropdown";
import Input from "./input/input";
//others
import {
  basicFields,
  fatFields,
  sectionedFields,
  subscriptionPlanData,
} from "@/constants/static-data";
import { getUserData } from "@/features/user/user-api";
import { parseFatValue } from "@/utils/helper";

function UserDataClient() {
  const { userData } = useSelector((state) => state.auth);
  const methods = useForm();
  const { reset, watch } = methods;
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const response = await getUserData(id);
        if (response?.status === 200) {
          const client = response.user;

          const resetData = {
            name: client.name ?? "",
            sfcId: client.sfcId ?? "",
            age: client.age ?? "",
            email: client.email ?? "",
            height: client.height ?? "",
            weight: client.weight ?? "",
            bodyAge: client.age ?? "",
            bmi: client.BMI ?? "",
            kCal: client.kCal ?? "",
            fullBodyMuscle: client.fullBodyMuscle ?? "",
            armsMuscle: client.armsMuscle ?? "",
            trunkMuscle: client.trunkMuscle ?? "",
            legsMuscle: client.legsMuscle ?? "",
            FAT: client.FAT,
            VFat: parseFatValue(client.VFat),
            SFat: parseFatValue(client.SFat),
            fullBodySFat: parseFatValue(client.fullBodySFat),
            armSFat: parseFatValue(client.armSFat),
            trunkSFat: parseFatValue(client.trunkSFat),
            legsSFat: parseFatValue(client.legsSFat),
            DOB: client.DOB ? new Date(client.DOB) : null,
            subscriptionPlan: client.subscriptionPlan ?? "",
          };

          reset(resetData);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    },
    [methods, reset]
  );

  useEffect(() => {
    fetchUserData(userData?._id);
  }, [fetchUserData]);
  return (
    <div className="h-full w-screen bg-white flex flex-col items-center px-6">
      <FormProvider {...methods}>
        <form className="w-full max-w-md space-y-4 mt-5 pb-5">
          {basicFields.map((field) => (
            <Input
              key={field.name}
              {...field}
              editable={false}
              isLoading={loading}
            />
          ))}

          {fatFields.map((row, index) => (
            <div key={index} className="w-full flex space-x-4 mt-4">
              {row.map((field) => (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  editable={false}
                  isLoading={loading}
                />
              ))}
            </div>
          ))}

          {sectionedFields.map((section) => (
            <div key={section.title}>
              <p className="text-base font-bold text-font_primary mb-2">
                {section.title}
              </p>
              <div className="w-full flex space-x-4">
                {section.fields.map((field) => (
                  <Input
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    editable={false}
                    isLoading={loading}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ))}
              </div>
            </div>
          ))}

          <InputDatePicker
            isLoading={loading}
            name="DOB"
            label="Date of Birth"
            editable={false}
          />

          <Dropdown
            name="subscriptionPlan"
            label="Subscription"
            options={subscriptionPlanData}
            value={watch("subscriptionPlan")}
            onChange={(val) => methods.setValue("subscriptionPlan", val)}
            placeholder="Select subscription"
            editable={false}
            isLoading={loading}
          />
        </form>
      </FormProvider>
    </div>
  );
}

export default UserDataClient;
