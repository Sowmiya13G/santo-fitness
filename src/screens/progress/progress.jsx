import { useEffect, useState } from "react";
//packages
import { FormProvider, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button";
import Dropdown from "@/components/input/dropdown";
import ScreenHeader from "@/components/screen-header";
// others
import { getUsersList } from "@/features/user/user-api";
import Calendar from "../../assets/icons/calendar-icon.svg";
import ReminderImage from "../../assets/images/reminder-image.svg";

const ProgressScreen = () => {
  const { userData } = useSelector((state) => state.auth);

  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const methods = useForm();
  const {
    watch,
    formState: { isSubmitting },
  } = methods;
  const fetchUsersList = async (role = "client") => {
    try {
      // setLoading(true);
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
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <div className="w-full space-y-6 text-gray-800 hide-scrollbar">
      <ScreenHeader title="Progress Photo" />
      {isClient && (
        <div className="relative bg-red_50 p-4 rounded-3xl flex items-center gap-4">
          <button className="absolute top-5 right-5 text-icon">
            <RxCross2 size={20} />
          </button>
          <div className="p-4 rounded-full bg-white">
            <img src={Calendar} alt="Calendar Icon" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-primary  text-base">Reminder!</p>
            <p className="font-semibold">Next photos fall on July 08</p>
          </div>
        </div>
      )}
      <div className="relative bg-red_30 py-7 px-6 rounded-3xl flex items-center">
        <div className="w-3/4 space-y-3">
          <p className="text-base">
            Track Your Progress Each Month With{"  "}
            <span className="text-gradient font-semibold"> Photo</span>
          </p>
          <Button
            label={"Compare"}
            customClassName="w-32 !h-12"
            onClick={() => navigate("/compare-progress")}
          />
        </div>
        <img src={ReminderImage} alt="Calendar Icon" className="w-15 h-15" />
      </div>
      {!isClient && (
        <FormProvider {...methods}>
          <form>
            <Dropdown
              name="person"
              label="Select Client"
              options={list}
              value={watch("person")}
              onChange={(val) => {
                methods.setValue("person", val);
              }}
              placeholder="Select Client"
            />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default ProgressScreen;
