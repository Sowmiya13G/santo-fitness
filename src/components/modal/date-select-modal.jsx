import { useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../input/dropdown";
import { FormProvider, useForm } from "react-hook-form";
import { updateUser } from "@/features/user/user-api";
import { showToast } from "../toast";

export default function DateCheckModal({ showModal, onClose }) {
  const today = new Date().toLocaleDateString();
  const [checked, setChecked] = useState(false);
  const [isPlanExpired, setIsPlanExpired] = useState(false);

  const { userList } = useSelector((state) => state.user);

  const methods = useForm();
  const { watch, setValue } = methods;
  const selectedUserId = watch("totalDaysCompleted"); // store only the ID

  const handleCheck = () => {
    if (!checked) {
      setChecked(true); // Only mark once
    }
  };

  const handleSave = async () => {
    if (selectedUserId && checked) {
      try {
        const findUser = userList.find((x) => x.value === selectedUserId);
        const payload = {
          totalDaysCompleted: findUser?.totalDaysCompleted?.length
            ? Array.from(new Set([...findUser.totalDaysCompleted, today]))
            : [today],
        };
        await updateUser(selectedUserId, payload);
        showToast("success", "User Attendance updated successfully");
      } catch (err) {
        console.error("Failed to update user attendance:", err);
      }
    }
    onClose();
  };

  if (!showModal) return null;

  if (isPlanExpired) {
    showToast("error", "User plan has expired, cannot mark attendance.");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex items-start pt-10 justify-center z-50">
      <FormProvider {...methods}>
        <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-start relative">
          <h2 className="text-lg font-bold mb-4 mx-auto">
            Mark Today's Attendance
          </h2>

          <Dropdown
            name="totalDaysCompleted"
            label="Select Client"
            options={userList}
            value={selectedUserId}
            onChange={(val) => {
              setValue("totalDaysCompleted", val);
              const user = userList.find((u) => u.value === val);

              if (user) {
                setIsPlanExpired(
                  user.subscriptionPlan - user.totalDaysCompleted.length === 0
                );

                setChecked(user.totalDaysCompleted?.includes(today));
              }
            }}
            placeholder="Select a client"
          />

          <p className="h-4" />

          <button
            onClick={handleCheck}
            disabled={!selectedUserId}
            className={`flex items-center justify-between w-full space-x-2 px-4 py-2 border rounded-lg 
              ${
                !selectedUserId
                  ? "bg-gray-100 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
          >
            <span>{today}</span>
            {checked ? (
              <span className="text-green-600 text-xl">✔</span>
            ) : (
              <span className="text-red-500 text-xl">✖</span>
            )}
          </button>

          {console.log("isPlanExpired: ", isPlanExpired)}
          {isPlanExpired ? (
            <h2 className="text-xs font-thin my-2 text-center text-red-500">
              Client Plan Expired !
            </h2>
          ) : (
            <h2 className="text-xs font-thin my-2 text-left text-gray-500">
              Select a client, then tap the date to mark attendance. You can
              only mark it once.
            </h2>
          )}

          <div className="flex w-full justify-between">
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedUserId || isPlanExpired}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
