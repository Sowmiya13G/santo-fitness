import { useEffect, useState, useRef } from "react";
import { FaCamera, FaRedo, FaUpload } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { SiTicktick } from "react-icons/si";

import BackActive from "../../assets/images/back-active.svg";
import FrontActive from "../../assets/images/front-active.svg";
import LeftActive from "../../assets/images/left-active.svg";
import RightActive from "../../assets/images/right-active.svg";

import Back from "../../assets/images/back.svg";
import Front from "../../assets/images/front.svg";
import Left from "../../assets/images/left.svg";
import Right from "../../assets/images/right.svg";

import {
  default as BackCompleted,
  default as FrontCompleted,
} from "../../assets/images/front-completed.svg";
import LeftCompleted from "../../assets/images/left-completed.svg";
import RightCompleted from "../../assets/images/right-completed.svg";

import ScreenHeader from "@/components/screen-header";
import { showToast } from "@/components/toast";
import { GradientSpinner } from "@/components/ui/spin-loader";

import { uploadBodyProgressData } from "@/features/progress/progress-api";
import { uploadFile } from "@/features/user/user-api";
import { base64ToFile } from "@/utils/helper";

const poses = [
  {
    active: FrontActive,
    inactive: Front,
    completed: FrontCompleted,
    pose: "Front",
  },
  {
    active: RightActive,
    inactive: Right,
    completed: RightCompleted,
    pose: "Right",
  },
  {
    active: BackActive,
    inactive: Back,
    completed: BackCompleted,
    pose: "Back",
  },
  {
    active: LeftActive,
    inactive: Left,
    completed: LeftCompleted,
    pose: "Left",
  },
];

export default function CameraScreen() {
  const fileInputRef = useRef(null);

  const [capturedImages, setCapturedImages] = useState({});
  const [selectedPose, setSelectedPose] = useState("Front");
  const [isUploading, setIsUploading] = useState(false);

  const allCaptured = Object.keys(capturedImages).length === poses.length;

  // useEffect(() => {
  //   if (!capturedImages[selectedPose]) {
  //     openFilePicker();
  //   }
  // }, [selectedPose]);

  const handleRetake = () => {
    setCapturedImages((prev) => {
      const updated = { ...prev };
      delete updated[selectedPose];
      return updated;
    });
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();

      const entries = await Promise.all(
        Object.entries(capturedImages).map(async ([pose, base64]) => {
          const file = await base64ToFile(base64, `${pose.toLowerCase()}.png`);
          return { pose, file };
        })
      );

      entries.forEach(({ file }) => {
        formData.append("files", file);
      });

      const uploadResponse = await uploadFile(formData);

      const imagePayload = entries.map(({ pose }, index) => ({
        url: uploadResponse?.urls[index],
        progressType: pose.toLowerCase(),
      }));

      const finalPayload = {
        images: imagePayload,
        // note: "Week 1 - visible muscle definition"
      };

      const result = await uploadBodyProgressData(finalPayload);
      if (result?.progress) {
        navigate(-1);
        setIsUploading(false);
        showToast("success", "Progress uploaded successfully!");
      }
    } catch (err) {
      console.error("File upload or metadata sending failed:", err);
      setIsUploading(false);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImages((prev) => ({
        ...prev,
        [selectedPose]: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  return (
    <div className="h-full w-min-full relative">
      {isUploading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <GradientSpinner />
        </div>
      )}
      <div className="absolute top-10 left-0 right-0 z-20 w-full">
        <ScreenHeader isBack />
      </div>
      <div className="w-full h-[90%] relative bg-primary-gradient">
        {capturedImages[selectedPose] ? (
          <img
            src={capturedImages[selectedPose]}
            alt={`Captured ${selectedPose}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-[90%] w-screen ">
            <img
              src={
                poses.find((p) => p.pose === selectedPose)?.inactive || ""
              }
              alt={selectedPose}
              className="h-[90%] pt-5 w-full object-fit"
            />
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[80%] flex items-center justify-evenly gap-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 z-10">
          <button className="text-white text-2xl">
            <IoMdFlash />
          </button>

          <button
            onClick={() => {
              if (allCaptured) {
                handleUpload();
              } else if (capturedImages[selectedPose]) {
                const currentIndex = poses.findIndex(
                  (p) => p.pose === selectedPose
                );
                const nextUncaptured =
                  poses.find(
                    (p, i) => i > currentIndex && !capturedImages[p.pose]
                  ) || poses.find((p) => !capturedImages[p.pose]);
                if (nextUncaptured) {
                  setSelectedPose(nextUncaptured.pose);
                }
              } else {
                openFilePicker();
              }
            }}
            className="bg-white p-3 rounded-full border-4 border-white text-red-600"
            aria-label={
              allCaptured
                ? "Upload Images"
                : capturedImages[selectedPose]
                  ? "Continue to Next Pose"
                  : "Capture Photo"
            }
          >
            {allCaptured ? (
              <FaUpload size={23} />
            ) : capturedImages[selectedPose] ? (
              <SiTicktick size={23} />
            ) : (
              <FaCamera size={24} />
            )}
          </button>

          <button onClick={handleRetake} className="text-white text-xl">
            <FaRedo />
          </button>
        </div>
      </div>
      <SiTicktick />
      <div className="h-4" />
      <div className="w-full absolute bottom-0 flex flex-col left-0 bg-field_primary">
        <div className="flex gap-4 px-2 py-5 rounded-full h-full w-full justify-evenly z-10">
          {poses.map(({ active, inactive, completed, pose }) => {
            const isSelected = selectedPose === pose;
            const isCompleted = !!capturedImages[pose];

            let imageSrc = inactive;
            if (isCompleted) {
              imageSrc = completed;
            } else if (isSelected) {
              imageSrc = active;
            }
            return (
              <button
                key={pose}
                onClick={() => {
                  setSelectedPose(pose);
                  if (!capturedImages[pose]) {
                    openFilePicker();
                  }
                }}
                className={`w-14 h-20 flex items-center justify-center rounded-lg transition-all duration-200 ${selectedPose === pose
                  ? "bg-field_primary border-icon border"
                  : "bg-white/20"
                  }`}
              >
                <img
                  src={imageSrc}
                  alt={pose}
                  className="w-8 h-16 object-contain"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
