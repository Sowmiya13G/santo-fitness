import {
  basicFields,
  fatFields,
  sectionedFields,
  subscriptionPlanData,
} from "@/constants/static-data";
import { useFormContext } from "react-hook-form";
import Button from "./button";
import InputDatePicker from "./input/date-picker";
import Dropdown from "./input/dropdown";
import Input from "./input/input";
import { useEffect } from "react";

const roleOptions = [
  { label: "Client", value: "client" },
  { label: "Trainer", value: "trainer" },
];

function UserData({
  list,
  trainerList,
  editable,
  isAdmin,
  isClient,
  isTrainer,
  isCreate,
  isSubmitting,
  loading,
  fetchUsersList,
  fetchUserData,
}) {
  const { watch, setValue } = useFormContext();
  const selectedRole = watch("role");
  const selectedPerson = watch("person");
  const selectedTrainer = watch("assignedTrainer");
  const isTrainerRole = selectedRole === "trainer";
  console.log("isTrainerRole: ", isTrainerRole);

  useEffect(() => {
    fetchUsersList();
  }, []);
  console.log("trainerList: ", list);
  return (
    <>
      {isAdmin && (
        <Dropdown
          name="role"
          label="Role"
          options={roleOptions}
          value={selectedRole}
          onChange={(val) => {
            setValue("role", val);
          }}
          placeholder="Select role"
        />
      )}
      {(isTrainer || (isAdmin && watch("role"))) && !isCreate && (
        <Dropdown
          name="person"
          label={`Select ${isTrainerRole ? "Trainer" : "Client"}`}
          options={isTrainerRole ? trainerList : list}
          value={selectedPerson}
          onChange={(val) => {
            setValue("person", val);
            fetchUserData(val);
          }}
          placeholder={`Select ${isTrainerRole ? "trainer" : "client"}`}
        />
      )}
      {selectedRole == "client" && (
        <Dropdown
          name="assignedTrainer"
          label={`Select Trainer`}
          options={trainerList}
          value={selectedTrainer}
          onChange={(val) => {
            setValue("assignedTrainer", val);
          }}
          placeholder={`Select trainer`}
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

      {fatFields.map((row, idx) => (
        <div key={idx} className="w-full flex space-x-4 mt-4">
          {row.map(({ name, label }) => (
            <Input
              key={name}
              name={name}
              label={label}
              placeholder={`Enter ${label.toLowerCase()}`}
              editable={editable}
              isLoading={loading}
            />
          ))}
        </div>
      ))}

      {sectionedFields.map(({ title, fields }) => (
        <div key={title}>
          <p className="text-base font-bold text-font_primary mb-2">{title}</p>
          <div className="w-full flex space-x-4">
            {fields.map((field) => (
              <Input
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                editable={editable}
                isLoading={loading}
              />
            ))}
          </div>
        </div>
      ))}

      <InputDatePicker
        name="DOB"
        label="Date of Birth"
        editable={editable}
        isLoading={loading}
      />

      <Dropdown
        name="subscriptionPlan"
        label="Subscription"
        options={subscriptionPlanData}
        value={watch("subscriptionPlan")}
        onChange={(val) => setValue("subscriptionPlan", val)}
        placeholder="Select subscription plan"
        editable={editable}
        isLoading={loading}
      />

      {!isClient && (
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          label={isCreate ? "Create" : "Update"}
        />
      )}
    </>
  );
}

export default UserData;
