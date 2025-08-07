import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import ProfileWrapper from "@/components/profile-wrapper";
import UserData from "@/components/user-data";
import maleProfile from "../../assets/icons/male-profile.svg";

import { showToast } from "@/components/toast";
import {
  createUser,
  getUserData,
  getUsersList,
  updateUser,
} from "@/features/user/user-api";
import { useLocation } from "react-router-dom";

const PersonalData = () => {
  const { userData } = useSelector((state) => state.auth);

  const methods = useForm();
  const { handleSubmit, reset, watch, setValue } = methods;

  const { pathname } = useLocation(); // full location info
  const lastSegment = pathname.split("/").filter(Boolean).pop();
  const [list, setList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRole = watch("role");
  const selectedPerson = watch("person");

  const isClient = useMemo(() => userData?.role === "client", [userData]);
  const isAdmin = useMemo(() => userData?.role === "admin", [userData]);
  const isTrainer = useMemo(() => userData?.role === "trainer", [userData]);
  const editable = !isClient;

  const isCreate = lastSegment === "personal-data" ? false : true; // or dynamic based on context

  const buildResetData = (client) => ({
    name: client.name ?? "",
    sfcId: client.sfcId ?? "",
    age: client.age ?? "",
    email: client.email ?? "",
    height: client.height ?? "",
    weight: client.weight ?? "",
    BMI: client.BMI ?? "",
    BMR: client.BMR ?? "",
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
    profileImg: client?.profileImg ?? "",
    assignedTrainer: client?.assignedTrainer ?? null,
    subscriptionPlan: client.subscriptionPlan,
    phoneNumber: client.phoneNumber,
    targetProtein:client?.targetProtein,
    targetCalories:client?.targetCalories,
    targetCarbs:client?.targetCarbs,
    targetFat:client?.targetFat,
    goal:client?.goal,
    ...(isAdmin && { role: methods.getValues("role") }),
    ...(!isClient && { person: methods.getValues("person") }),
    // ...(!isClient && { assignedTrainer: methods.getValues("assignedTrainer") }),
  });

  const fetchUsersList = async () => {
    try {
      const response = await getUsersList();
      if (response?.status === 200) {
        const users = response.users
          .filter((x) => x.role == "client")
          .map((x) => ({
            value: x._id,
            label: x.name,
          }));
        const trainers = response.users
          .filter((x) => x.role == "trainer")
          .map((x) => ({
            value: x._id,
            label: x.name,
          }));
        setList(users);

        setTrainerList(trainers);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const fetchUserData = async (id) => {
    setLoading(true);
    try {
      const res = await getUserData(id);
      if (res?.status === 200) {
        reset(buildResetData(res.user));
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const userId = selectedPerson;
      const action = isCreate
        ? createUser(data)
        : () => updateUser(userId, data);

      await action(data);
      showToast(
        "success",
        isCreate
          ? "Profile Created Successfully"
          : "Profile Updated Successfully"
      );
    } catch (err) {
      console.error("Submission error:", err);
      showToast("error", "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (userData.role === "client") {
      fetchUserData();
    }
  }, [userData.role]);

  return (
    <FormProvider {...methods}>
      <ProfileWrapper
        title={isCreate ? "Add New Client" : "Personal Data"}
        image={maleProfile}
        profile
        isClient={isClient}
        setValue={setValue}
        watch={watch}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 pb-5 px-4"
        >
          <UserData
            list={list}
            trainerList={trainerList}
            setList={setList}
            editable={editable}
            isAdmin={isAdmin}
            isCreate={isCreate}
            isTrainer={isTrainer}
            isClient={isClient}
            isSubmitting={isSubmitting}
            loading={loading}
            fetchUsersList={fetchUsersList}
            fetchUserData={fetchUserData}
          />
        </form>
      </ProfileWrapper>
    </FormProvider>
  );
};

export default PersonalData;
