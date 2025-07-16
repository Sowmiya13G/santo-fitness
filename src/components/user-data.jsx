// packages
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import Button from "./button";
import InputDatePicker from "./input/date-picker";
import Dropdown from "./input/dropdown";
import FatInput from "./input/fat-input";
import Input from "./input/input";
// others
import {
  basicFields,
  fatFields,
  sectionedFields,
  subscriptionPlanData,
} from "@/constants/static-data";
import {
  createUser,
  getUserData,
  getUsersList,
  updateUser,
} from "@/features/user/user-api";
import { parseFatValue } from "@/utils/helper";

// function chunkArray(array, size) {
//   const result = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// }

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
  const [fatFieldData, setFatFieldData] = useState(fatFields);
  const [fatFieldsData, setFatFieldsData] = useState(sectionedFields);
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
          kCal: client.kCal ?? "",
          fullBodyMuscle: client.fullBodyMuscle ?? "",
          armsMuscle: client.armsMuscle ?? "",
          trunkMuscle: client.trunkMuscle ?? "",
          legsMuscle: client.legsMuscle ?? "",
          DOB: client.DOB ? new Date(client.DOB) : null,
          subscriptionPlan: client?.subscriptionPlan,
        };

        if (isClient) {
          resetData.FAT = client.FAT ?? "";
          resetData.VFat = client.VFat ?? "";
          resetData.SFat = client.SFat ?? "";
          resetData.fullBodySFat = client.fullBodySFat ?? "";
          resetData.armSFat = client.armSFat ?? "";
          resetData.trunkSFat = client.trunkSFat ?? "";
          resetData.legsSFat = client.legsSFat ?? "";
        } else {
          if (isAdmin) {
            const currentRole = methods.getValues("role");
            resetData.role = currentRole;
          }
          const currentPerson = methods.getValues("person");
          resetData.person = currentPerson;

          resetData.FAT = parseFatValue(client.FAT) ?? "";
          console.log("parseFatValue(client.FAT): ", parseFatValue(client.FAT));
          resetData.VFat = parseFatValue(client.VFat) ?? "";
          resetData.SFat = parseFatValue(client.SFat) ?? "";
          resetData.fullBodySFat = parseFatValue(client.fullBodySFat) ?? "";
          resetData.armSFat = parseFatValue(client.armSFat) ?? "";
          resetData.trunkSFat = parseFatValue(client.trunkSFat) ?? "";
          resetData.legsSFat = parseFatValue(client.legsSFat) ?? "";
        }

        reset(resetData);
      }
    } catch (err) {
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
    if (!isClient) {
      fetchUsersList(isTrainerRole ? "trainer" : "client");
    } else {
      fetchUserData(userData?._id);
    }
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
            <Input key={field.name} {...field} editable={editable} />
          ))}
          {fatFields.map((row, index) => (
            <div key={index} className="w-full flex space-x-4 mt-4">
              {row.map(({ name, label, isFat, value }) =>
                isFat ? (
                  <FatInput
                    key={name}
                    name={name}
                    label={label}
                    placeholder={`Enter ${label?.toLowerCase()}`}
                    editable={editable}
                    currentVal={value}
                    onChange={(val) => {
                      setFatFieldData((prev) =>
                        prev.map((row) =>
                          row.map((field) =>
                            field.name === name
                              ? { ...field, value: val }
                              : field
                          )
                        )
                      );
                    }}
                  />
                ) : (
                  <Input
                    key={name}
                    name={name}
                    label={label}
                    placeholder={`Enter ${label?.toLowerCase()}`}
                    editable={editable}
                  />
                )
              )}
            </div>
          ))}
          {sectionedFields.map((section, sectionIdx) => (
            <div key={section.title}>
              <p className="text-base font-bold text-font_primary mb-2">
                {section.title}
              </p>
              <div className="w-full flex space-x-4">
                {section.fields.map((field, fieldIdx) =>
                  field.isFat ? (
                    <FatInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      editable={editable}
                      placeholder={`Enter ${field?.label.toLowerCase()}`}
                      onChange={(val) => {
                        setFatFieldsData((prev) =>
                          prev.map((sec, i) =>
                            i === sectionIdx
                              ? {
                                  ...sec,
                                  fields: sec.fields.map((f, j) =>
                                    j === fieldIdx ? { ...f, value: val } : f
                                  ),
                                }
                              : sec
                          )
                        );
                      }}
                      currentVal={field?.value}
                    />
                  ) : (
                    <Input
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      editable={editable}
                      placeholder={`Enter ${field?.label.toLowerCase()}`}
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
          />

          <Dropdown
            name="subscriptionPlan"
            label="Subscription"
            options={subscriptionPlanData}
            value={methods.watch("subscriptionPlan")}
            onChange={(val) => methods.setValue("subscriptionPlan", val)}
            placeholder="Select subscriptionPlan"
            editable={!isClient}
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
