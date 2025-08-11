import Button from "@/components/button";
import Dropdown from "@/components/input/dropdown";
import ScreenHeader from "@/components/screen-header";
import { getProgressData } from "@/features/progress/progress-api";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaCamera, FaDownload } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Calendar from "../../assets/icons/calendar-icon.svg";
import ReminderImage from "../../assets/images/reminder-image.svg";

const ProgressScreen = () => {
  const { userData } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.user);

  const isClient = userData?.role === "client";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // [{ monthYear: "August 2025", images: [{ url }] }]
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const methods = useForm();
  const { watch, setValue } = methods;

  const currentMonthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const openModal = (groupIndex, imageIndex) => {
    setSelectedGroupIndex(groupIndex);
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGroupIndex(null);
    setSelectedImageIndex(null);
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev - 1);
    } else if (selectedGroupIndex > 0) {
      const prevGroup = images[selectedGroupIndex - 1];
      setSelectedGroupIndex((prev) => prev - 1);
      setSelectedImageIndex(prevGroup.images.length - 1);
    } else if (images.length > 0) {
      // wrap to last
      const lastGroupIndex = images.length - 1;
      const lastImageIndex = images[lastGroupIndex].images.length - 1;
      setSelectedGroupIndex(lastGroupIndex);
      setSelectedImageIndex(lastImageIndex);
    }
  };

  const nextImage = () => {
    if (
      selectedGroupIndex != null &&
      selectedImageIndex != null &&
      selectedImageIndex < images[selectedGroupIndex].images.length - 1
    ) {
      setSelectedImageIndex((prev) => prev + 1);
    } else if (
      selectedGroupIndex != null &&
      selectedGroupIndex < images.length - 1
    ) {
      setSelectedGroupIndex((prev) => prev + 1);
      setSelectedImageIndex(0);
    } else if (images.length > 0) {
      // wrap to first
      setSelectedGroupIndex(0);
      setSelectedImageIndex(0);
    }
  };

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectURL;
      link.download = `progress-${(selectedImageIndex ?? 0) + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Image download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  const fetchProgressList = async (targetId) => {
    if (!targetId) return;
    setLoading(true);
    try {
      const response = await getProgressData({ targetId });

      if (response?.progress && Array.isArray(response.progress)) {
        // Sort newest first
        const sortedProgress = [...response.progress].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Group by month-year; merge images from entries within the same month
        const groupedMap = sortedProgress.reduce((acc, entry) => {
          const entryDate = new Date(entry.date);
          if (isNaN(entryDate.getTime())) return acc;

          const monthYear = entryDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });

          if (!acc.has(monthYear)) {
            acc.set(monthYear, { monthYear, images: [] });
          }
          const bucket = acc.get(monthYear);

          if (Array.isArray(entry.images)) {
            for (const img of entry.images) {
              if (img?.url) bucket.images.push({ url: img.url });
            }
          }
          return acc;
        }, new Map());

        // Convert to array
        const grouped = Array.from(groupedMap.values());

        // Ensure month groups are newest-first
        grouped.sort((a, b) => {
          const dA = new Date(`${a.monthYear} 1`);
          const dB = new Date(`${b.monthYear} 1`);
          return dB - dA;
        });

        setImages(grouped);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error("Failed to fetch progress:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userList && !isClient && userList.length > 0) {
      setValue("person", userList[0]?.value);
      fetchProgressList(userList[0]?.value);
    }
  }, [setValue, userList, isClient]);

  useEffect(() => {
    if (isClient && userData?._id) {
      fetchProgressList(userData._id);
    }
  }, [isClient, userData?._id]);

  const hasCurrentMonthImages = images.some(
    (group) => group.monthYear === currentMonthYear && group.images?.length > 0
  );

  return (
    <>
      <div className="w-screen  space-y-6 hide-scrollbar px-2 py-6 mb-10">
        <ScreenHeader title="Progress Photo" />
        {isClient && (
          <div
            className="bg-primary-gradient w-14 h-14 rounded-full flex items-center justify-center fixed bottom-[13%] right-2 cursor-pointer"
            onClick={() => navigate("/camera-screen")}
          >
            <FaCamera className="text-white text-xl" />
          </div>
        )}

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

            {!hasCurrentMonthImages && !loading && (
              <div className="relative bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 w-full rounded-3xl flex items-center gap-4">
                <div className="p-4 rounded-full bg-yellow-200 max-w-16 w-1/5">
                  <img src={Calendar} alt="Calendar Icon" className="w-8 h-8" />
                </div>
                <div className="w-4/5">
                  <p className="text-base text-yellow-900 font-semibold">
                    Reminder!
                  </p>
                  <p className="font-normal">
                    No progress photos added for {currentMonthYear}. Don’t
                    forget to upload!
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <div className="relative w-full bg-red_30 py-7 px-6 rounded-3xl flex items-center">
          <div className="w-3/4 space-y-3">
            <p className="text-md">
              Track Your Progress Each Month With{" "}
              <span className="text-gradient font-semibold"> Photo</span>
            </p>
            <Button
              label={"Compare"}
              customClassName="!w-28 !h-10 text-sm"
              onClick={() => {
                if (isClient) {
                  navigate(`/compare-progress?person=${userData._id}`);
                } else {
                  navigate(`/compare-progress?person=${watch("person")}`);
                }
              }}
            />
          </div>
          <img src={ReminderImage} alt="Reminder" className="h-full w-1/4" />
        </div>

        {loading ? (
          <p className="text-center text-base text-icon">loading...!</p>
        ) : images.length > 0 ? (
          images.map((group, gIdx) => (
            <div key={gIdx} className="mb-6">
              <h3 className="text-md font-semibold mb-3">{group.monthYear}</h3>
              <div className="grid grid-cols-3 gap-2">
                {group.images?.map((img, idx) => (
                  <div
                    key={idx}
                    className="max-w-32 h-28  min-w-20  rounded-xl overflow-hidden border border-gray-200 cursor-pointer"
                    onClick={() => openModal(gIdx, idx)}
                  >
                    <img
                      src={img.url}
                      alt={`Progress ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-icon">No data available.</p>
        )}
      </div>
      {isModalOpen &&
        selectedGroupIndex != null &&
        selectedImageIndex != null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center h-ful bg-black bg-opacity-80">
            <div className="relative max-w-3xl w-full mx-4 bg-white p-4 rounded-xl">
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-5 right-5 text-gray-600 bg-white p-1 rounded-full w-10 h-10 hover:text-black text-xl font-bold"
              >
                <IoIosClose className="text-3xl" />
              </button>

              <img
                src={
                  images[selectedGroupIndex]?.images[selectedImageIndex]?.url
                }
                alt="Progress"
                loading="lazy"
                className="w-full max-h-[70vh] object-contain rounded"
              />

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

              <button
                onClick={() =>
                  downloadImage(
                    images[selectedGroupIndex]?.images[selectedImageIndex]?.url
                  )
                }
                className="absolute bottom-0 right-0 bg-white px-3 py-2 rounded-full flex items-center gap-2"
              >
                <FaDownload />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default ProgressScreen;
