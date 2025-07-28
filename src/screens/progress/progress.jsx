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
import { getProgressData } from "@/features/progress/progress-api";
import { FaAngleRight } from "react-icons/fa";
import Calendar from "../../assets/icons/calendar-icon.svg";
import ReminderImage from "../../assets/images/reminder-image.svg";
import { GradientSpinner } from "@/components/ui/spin-loader";

const ProgressScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.user);

  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const methods = useForm();
  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const fetchProgressList = async (targetId) => {
    setLoading(true);
    try {
      const response = await getProgressData(isClient ? {} : { targetId });
      if (response?.progress) {
        const allImages = response?.progress
          ?.flatMap((entry) => {
            return entry?.images || [];
          })
          ?.map((img) => ({
            url: img?.url,
          }));
        setImages(allImages);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch progress:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userList) {
      setValue("person", userList[0]?.value);
    }
  }, [setValue, userList]);

  useEffect(() => {
    fetchProgressList();
  }, []);

  return (
    <div className="w-full space-y-6 hide-scrollbar">
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
            customClassName="!w-36 !h-12"
            onClick={() =>
              navigate(`/compare-progress?person=${watch("person")}`)
            }
          />
        </div>
        <img src={ReminderImage} alt="Calendar Icon" className="w-15 h-15" />
      </div>
      {!isClient && (
        <>
          <FormProvider {...methods}>
            <form>
              <Dropdown
                name="person"
                label="Select Client"
                options={userList}
                value={watch("person")}
                onChange={(val) => {
                  methods.setValue("person", val);
                  fetchProgressList(val);
                }}
                placeholder="Select Client"
              />
            </form>
          </FormProvider>
          <div className="relative bg-red_50 p-4 rounded-3xl flex items-center gap-4">
            <div className="p-4 rounded-full bg-white">
              <img src={Calendar} alt="Calendar Icon" className="w-8 h-8" />
            </div>
            <div>
              <p className="text-primary  text-base">Reminder!</p>
              <p className="font-semibold">Upload new progress</p>
            </div>
            <button
              className="absolute right-5"
              onClick={() => navigate("/camera-screen")}
            >
              <FaAngleRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
      {loading ? (
        <>
          <p className="text-center text-base text-icon">loading...!</p>
          {/* <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <GradientSpinner />
        </div> */}
        </>
      ) : (
        <>
          {images?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 px-4 pb-10">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-xl overflow-hidden border border-gray-200"
                >
                  <img
                    src={img.url}
                    alt={`Progress ${idx + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-icon">No data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProgressScreen;
