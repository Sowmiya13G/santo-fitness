// packages
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import Button from "./Button";
import InputDatePicker from "./input/date-picker";
import Dropdown from "./input/dropdown";
import FatInput from "./input/fat-input";
import Input from "./input/input";
// others
import {
  createUser,
  getUserData,
  getUsersList,
  updateUser,
} from "@/features/user/user-api";
import {
  basicFields,
  fatFields,
  sectionedFields,
  subscriptionPlanData,
} from "@/constants/static-data";

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const roleOptions = [
  { label: "Client", value: "client" },
  { label: "Trainer", value: "trainer" },
  // { label: "Admin", value: "admin" },
];

function UserData({ isCreate = false }) {
  const { userData } = useSelector((state) => state.auth);
  const methods = useForm({
    // resolver: yupResolver(),
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const isClient = userData?.role === "client";
  const isAdmin = userData?.role === "admin";
  const editable = !isClient;

  const isTrainerRole = watch("role") === "trainer";
  // ---------------------------------- functionalites ---------------------------------- //

  const fetchUsersList = async (role = "client") => {
    try {
      const response = await getUsersList(role);
      if (response?.status === 200) {
        const res = response?.users?.map((x) => ({
          value: x?._id,
          label: x?.name,
        }));
        setList(res);
      }
    } catch (err) {
      console.error("Failed to fetch clients list:", err);
    }
  };

  const fetchUserData = async (id) => {
    setLoading(true);
    try {
      const response = await getUserData(id);
      if (response?.status === 200) {
        const client = response.user;

        const resetData = {
          name: client.name ?? "",
          sfcId: client.sfcId ?? "",
          age: client.age ?? "",
          email: client?.email ?? "",
          height: client.height ?? "",
          weight: client.weight ?? "",
          bodyAge: client.age ?? "",
          bmi: client.BMI ?? "",
          fat: client.FAT ?? "",
          VFat: client.VFat ?? "",
          SFat: client.SFat ?? "",
          kCal: client.kCal ?? "",
          fullBodySFat: client.fullBodySFat ?? "",
          fullBodyMuscle: client.fullBodyMuscle ?? "",
          armSFat: client.armSFat ?? "",
          armsMuscle: client.armsMuscle ?? "",
          trunkSFat: client.trunkSFat ?? "",
          trunkMuscle: client.trunkMuscle ?? "",
          legsSFat: client.legsSFat ?? "",
          legsMuscle: client.legsMuscle ?? "",
          DOB: client.DOB ? new Date(client.DOB) : null,
          subscriptionPlan: client?.subscriptionPlan,
        };

        if (isAdmin) {
          const currentRole = methods.getValues("role");
          const currentPerson = methods.getValues("person");
          resetData.role = currentRole;
          resetData.person = currentPerson;
        }

        reset(resetData);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch user data:", err);
    }
  };

  const onSubmit = async (data) => {
    console.log("🚀 ~ UserData ~ data:", data);

    const formatted = `${data?.DOB.getFullYear()}-${String(
      data?.DOB.getMonth() + 1
    ).padStart(2, "0")}-${String(data?.DOB.getDate()).padStart(2, "0")}`;

    console.log("🚀 ~ onSubmit ~ formatted:", formatted);

    return;
    if (isCreate) {
      const response = await updateUser(watch("person"), data);
      console.log("🚀 ~ onSubmit ~ response:", response);
    } else {
      const response = await createUser(data);
      console.log("🚀 ~ onSubmit ~ response:", response);
    }
  };
  // ---------------------------------- use effects ---------------------------------- //

  useEffect(() => {
    fetchUsersList(isTrainerRole ? "trainer" : "client");
  }, []);

  // ---------------------------------- render ui ---------------------------------- //

  return (
    <div className="h-full w-screen bg-white flex flex-col items-center px-6">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 mt-5 pb-5"
        >
          {isAdmin && (
            <Dropdown
              name="role"
              label="Role"
              options={roleOptions}
              value={methods.watch("role")}
              onChange={(val) => {
                reset({
                  role: val,
                });
                fetchUsersList(val);
              }}
              placeholder="Select role"
            />
          )}
          {!isClient && !isCreate && (
            <Dropdown
              name="person"
              label={`Select ${isTrainerRole ? "Trainer" : "Client"}`}
              options={list}
              value={methods.watch("person")}
              onChange={(val) => {
                methods.setValue("person", val);
                fetchUserData(val);
              }}
              placeholder={`Select ${isTrainerRole ? "trainer" : "client"}`}
            />
          )}
          {basicFields.map((field) => (
            <Input
              key={field.name}
              {...field}
              editable={editable}
              isLoading={loading}
            />
          ))}
          {fatFields.map((row, index) => (
            <div key={index} className="w-full flex space-x-4 mt-4">
              {row.map(({ name, label, isFat }) =>
                isFat ? (
                  <FatInput
                    key={name}
                    name={name}
                    label={label}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    editable={editable}
                    isLoading={loading}
                  />
                ) : (
                  <Input
                    key={name}
                    name={name}
                    label={label}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    editable={editable}
                    isLoading={loading}
                  />
                )
              )}
            </div>
          ))}
          {sectionedFields.map((section) => (
            <div key={section.title}>
              <p className="text-base font-bold text-font_primary mb-2">
                {section.title}
              </p>
              <div className="w-full flex space-x-4">
                {section.fields.map((field) =>
                  field.isFat ? (
                    <FatInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      editable={editable}
                      placeholder="0"
                      isLoading={loading}
                    />
                  ) : (
                    <Input
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      editable={editable}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      isLoading={loading}
                    />
                  )
                )}
              </div>
            </div>
          ))}

          <InputDatePicker
            name="DOB"
            label="Date of Birth"
            editable={isClient ? false : true}
            isLoading={loading}
          />

          <Dropdown
            name="subscriptionPlan"
            label="Subscription"
            options={subscriptionPlanData}
            value={methods.watch("subscriptionPlan")}
            onChange={(val) => methods.setValue("subscriptionPlan", val)}
            placeholder="Select subscriptionPlan"
            editable={!isClient}
            isLoading={loading}
          />
          {!isClient && (
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              label={!isCreate ? "Update" : "Create"}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
}

export default UserData;
