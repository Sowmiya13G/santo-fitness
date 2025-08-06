import { useEffect, useState } from "react";
//packages
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button";
import Dropdown from "@/components/input/dropdown";
import ScreenHeader from "@/components/screen-header";
// others
import { getProgressData } from "@/features/progress/progress-api";
import { FaAngleRight, FaCamera, FaDownload } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import Calendar from "../../assets/icons/calendar-icon.svg";
import ReminderImage from "../../assets/images/reminder-image.svg";

const ProgressScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.user);

  const isClient = userData?.role === "client";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const methods = useForm();
  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" }); // ensures blob access
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectURL;
      link.download = `progress-${selectedImageIndex + 1}.jpg`; // or .png if appropriate
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL); // clean up memory
    } catch (error) {
      console.error("Image download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

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
      fetchProgressList(userList[0]?.value);
    }
  }, [setValue, userList]);

  useEffect(() => {
    if (isClient) {
      fetchProgressList();
    }
  }, []);

  return (
    <div className="w-screen space-y-6 hide-scrollbar px-5 py-6 mb-10">
      <ScreenHeader title="Progress Photo" />
      <div
        className="bg-primary-gradient w-14 h-14 rounded-full flex items-center justify-center fixed bottom-[13%] right-2"
        onClick={() => navigate("/camera-screen")}
      >
        <FaCamera className="text-white text-xl" />
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
      <div className="relative bg-red_30 py-7 px-6 rounded-3xl flex items-center">
        <div className="w-3/4 space-y-3">
          <p className="text-base">
            Track Your Progress Each Month With{"  "}
            <span className="text-gradient font-semibold"> Photo</span>
          </p>
          <Button
            label={"Compare"}
            customClassName="!w-36 !h-12"
            onClick={() => {
              if (isClient) {
                navigate(`/compare-progress`);
              } else {
                navigate(`/compare-progress?person=${watch("person")}`);
              }
            }}
          />
        </div>
        <img src={ReminderImage} alt="Calendar Icon" className="w-15 h-15" />
      </div>
      {loading ? (
        <p className="text-center text-base text-icon">loading...!</p>
      ) : (
        <>
          <p className="text-left text-md font-semibold text-font_primary !my-4">
            Gallery
          </p>

          {images?.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 h-[55vh] overflow-y-scroll overflow-hidden  hide-scrollbar !m-0 pb-10">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-28 h-28 rounded-xl overflow-hidden border border-gray-200"
                  onClick={() => openModal(idx)}
                >
                  <img
                    src={img.url}
                    alt={`Progress ${idx + 1}`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "0% 0%" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-icon">No data available.</p>
          )}
        </>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative max-w-3xl w-full mx-4 bg-white p-4 rounded-xl">
            <button
              onClick={closeModal}
              type="button"
              className="absolute top-5 right-5 text-gray-600 bg-white p-1 rounded-full w-10 h-10 hover:text-black text-xl font-bold"
            >
              <IoIosClose className="text-3xl" />
            </button>

            <img
              src={images[selectedImageIndex]?.url}
              alt={`Progress ${selectedImageIndex + 1}`}
              className="w-full max-h-[70vh] object-contain rounded"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <IoIosArrowForward className="text-xl" />
            </button>

            {/* Download Button */}
            <button
              onClick={() => downloadImage(images[selectedImageIndex].url)}
              className="absolute bottom-0 right-0  bg-white px-3 py-2 rounded-full  flex items-center gap-2"
            >
              <FaDownload />
              <span className="text-sm">Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressScreen;
