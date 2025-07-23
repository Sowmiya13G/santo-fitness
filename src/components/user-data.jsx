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
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "./button";
import InputDatePicker from "./input/date-picker";
import Dropdown from "./input/dropdown";
import Input from "./input/input";
import { showToast } from "./toast";

const roleOptions = [
  { label: "Client", value: "client" },
  { label: "Trainer", value: "trainer" },
];

function UserData({ isCreate = false }) {
  const { userData } = useSelector((state) => state.auth);
  const methods = useForm();
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
  const isTrainerRole = watch("role") === "trainer";

  const fetchUsersList = async (role = "client") => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (id) => {
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

        if (!isClient) {
          if (isAdmin) resetData.role = methods.getValues("role");
          resetData.person = methods.getValues("person");
        }

        reset(resetData);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const formattedDOB = `${data?.DOB.getFullYear()}-${String(
      data?.DOB.getMonth() + 1
    ).padStart(2, "0")}-${String(data?.DOB.getDate()).padStart(2, "0")}`;

    const payload = {
      ...data,
      DOB: formattedDOB,
    };

    try {
      setLoading(true);
      if (isCreate) {
        await createUser(payload);
        showToast("success", "User Details Created Successfully");
      } else {
        await updateUser(watch("person"), payload);
        showToast("success", "User Details Updated Successfully");
      }
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isClient) {
      fetchUsersList(isTrainerRole ? "trainer" : "client");
    } else {
      fetchUserData(userData?._id);
    }
  }, [fetchUserData, isClient, isTrainerRole, userData?._id]);
  return (
    <div className="h-full w-screen bg-white flex flex-col items-center px-6">
      {loading && <p className="text-center text-gray-500">Loading...</p>}

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
              value={watch("role")}
              onChange={(val) => {
                reset({ role: val });
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
              value={watch("person")}
              onChange={(val) => {
                methods.setValue("person", val);
                fetchUserData(val);
              }}
              placeholder={`Select ${isTrainerRole ? "trainer" : "client"}`}
            />
          )}

          {basicFields.map((field) => (
            <Input key={field.name} {...field} editable={!isClient} />
          ))}

          {fatFields.map((row, index) => (
            <div key={index} className="w-full flex space-x-4 mt-4">
              {row.map((field) => (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  editable={!isClient}
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
                    editable={!isClient}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ))}
              </div>
            </div>
          ))}

          <InputDatePicker
            name="DOB"
            label="Date of Birth"
            editable={!isClient}
          />

          <Dropdown
            name="subscriptionPlan"
            label="Subscription"
            options={subscriptionPlanData}
            value={watch("subscriptionPlan")}
            onChange={(val) => methods.setValue("subscriptionPlan", val)}
            placeholder="Select subscription"
            editable={!isClient}
          />

          {!isClient && (
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              loading={isSubmitting || loading}
              label={!isCreate ? "Update" : "Create"}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
}

export default UserData;
