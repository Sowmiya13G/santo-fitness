import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HorizontalCalendar from "@/components/horizontal-calendar";
import ProfileWrapper from "@/components/profile-wrapper";
import ActivityGrid from "@/components/ui/active-grid";
import DietProgress from "@/components/ui/diet-progress";

import { getDietProgress } from "@/features/daily-logs/daily-logs-api";
import {
  setTodayLogs,
  setWeekLogs,
} from "@/features/daily-logs/daily-logs-slice";
import { format, parseISO } from "date-fns";
import Dropdown from "@/components/input/dropdown";
import { FormProvider, useForm } from "react-hook-form";

const ActivityHistory = () => {
  const { userData } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm();
  const { watch, setValue } = methods;
  const isClient = userData?.role === "client";

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const selectedUser = watch("person");
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const params = {
        date: format(selectedDate, "yyyy-MM-dd"),
        userId: selectedUser,
      };
      const raw = await getDietProgress(params);

      if (raw.length == 0) {
        dispatch(setTodayLogs(null));
      } else {
        dispatch(setTodayLogs(raw[0]));
      }
    } catch (error) {
      console.error("Failed to fetch diet progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeekLogs = async () => {
    try {
      setIsLoading(true);
      const params = {
        days: 14,
        userId: selectedUser,
      };
      const raw = await getDietProgress(params);
      dispatch(setWeekLogs(raw));
    } catch (error) {
      console.error("Failed to fetch week logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue("person", isClient ? userData._id : userList[0]?.value);
  }, [isClient, setValue, userList]);
  useEffect(() => {
    if (selectedUser) {
      fetchData();
    }
  }, [selectedDate, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      fetchWeekLogs();
    }
  }, [selectedUser]);
  return (
    <FormProvider {...methods}>
      <ProfileWrapper
        title="Activity History"
        // image={userData?.profileImg}
        bgColor="bg-secondary"
        imgClass="!scale-175 rounded-none object-contain top-[25px] absolute"
      >
        {isLoading && (
          <p className="text-center text-base mt-3 font-medium text-icon">
            Loading..!
          </p>
        )}
        <div className="w-screen min-h-screen px-3 !mb-2 space-y-6">
          {userData.role !== "client" && (
            <Dropdown
              name="person"
              label="Select Client"
              options={userList || []}
              value={selectedUser}
              onChange={(val) => setValue("person", val)}
              placeholder="Select client"
            />
          )}

          <HorizontalCalendar onSelectDate={(date) => setSelectedDate(date)} />
          <ActivityGrid />
          <DietProgress />
        </div>
      </ProfileWrapper>
    </FormProvider>
  );
};

export default ActivityHistory;
