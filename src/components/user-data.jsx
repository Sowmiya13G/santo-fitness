// packages
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import Button from "./Button";
import InputDatePicker from "./input/date-picker";
import Input from "./input/input";
// others
import {
  basicFields,
  fatFields,
  sectionedFields,
} from "@/constants/staticData";
import { useEffect } from "react";
import { getUserData } from "@/features/user/userAPI";

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function UserData() {
  const { userData } = useSelector((state) => state.auth);
  const methods = useForm({
    resolver: yupResolver(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const isClient = userData?.role === "client";
  const editable = !isClient;

  // ---------------------------------- functionalites ---------------------------------- //

  const onSubmit = async (data) => {};
  // ---------------------------------- use effects ---------------------------------- //
  useEffect(() => {
    const fetchUserData = async () => {
      if (isClient && userData?._id) {
        try {
          const response = await getUserData(userData._id);
          if (response?.status === 200) {
            console.log('response: ', response);
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      }
    };
  
    fetchUserData();
  }, []);
  // ---------------------------------- render ui ---------------------------------- //

  return (
    <div className="h-full w-screen bg-white flex flex-col items-center px-6">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 mt-5 pb-5"
        >
          {basicFields.map((field) => (
            <Input key={field.name} {...field} editable={editable} />
          ))}
          {chunkArray(fatFields, 2).map((group, idx) => (
            <div key={idx} className="w-full flex space-x-4">
              {group.map((field) => (
                <Input
                  key={field.name}
                  {...field}
                  type="number"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  editable={editable}
                />
              ))}
            </div>
          ))}
          {sectionedFields.map((section) => (
            <div key={section.title}>
              <p className="text-base font-bold text-black mb-2">
                {section.title}
              </p>
              <div className="w-full flex space-x-4">
                {section.fields.map((field) => (
                  <Input
                    key={field.name}
                    {...field}
                    type="number"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    editable={editable}
                  />
                ))}
              </div>
            </div>
          ))}
          <InputDatePicker
            name="dob"
            label="Date of Birth"
            editable={isClient ? false : true}
          />
          {!isClient && (
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Create
            </Button>
          )}
        </form>
      </FormProvider>
    </div>
  );
}

export default UserData;
