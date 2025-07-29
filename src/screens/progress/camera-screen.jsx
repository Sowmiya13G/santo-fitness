import { useEffect, useRef, useState } from "react";
import { FaCamera, FaRedo, FaUpload } from "react-icons/fa";
import { IoMdFlash, IoMdFlashOff } from "react-icons/io";
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
import { GradientSpinner } from "@/components/ui/spin-loader";
import { uploadBodyProgressData } from "@/features/progress/progress-api";
import { uploadFile } from "@/features/user/user-api";
import { showToast } from "@/components/toast";

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

function base64ToFile(dataUrl, filename) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default function CameraScreen() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [facingMode, setFacingMode] = useState("environment");
  const [flashOn, setFlashOn] = useState(false);
  const [capturedImages, setCapturedImages] = useState({});
  const [selectedPose, setSelectedPose] = useState("Front");
  const [isUploading, setIsUploading] = useState(false);

  const allCaptured = Object.keys(capturedImages).length === poses.length;
  const isDisabled = allCaptured ? false : capturedImages[selectedPose];

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (!capturedImages[selectedPose]) {
      startCamera();
    }
  }, [selectedPose]);

  const startCamera = async () => {
    stopCamera();

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;

        const playPromise = new Promise((resolve, reject) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current
              .play()
              .then(resolve)
              .catch((err) => {
                console.warn("Camera play failed:", err);
                reject(err);
              });
          };
        });

        await playPromise;
      }

      streamRef.current = newStream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    const currentStream = streamRef.current;
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleFlash = async () => {
    const stream = streamRef.current;
    if (!stream) return;

    const [videoTrack] = stream.getVideoTracks();
    if (!videoTrack) return;

    const capabilities = videoTrack.getCapabilities?.();
    if (!capabilities?.torch) {
      alert("Flash not supported on this device/browser.");
      return;
    }

    try {
      await videoTrack.applyConstraints({
        advanced: [{ torch: !flashOn }],
      });
      setFlashOn((prev) => !prev);
    } catch (err) {
      console.error("Torch toggle failed:", err);
      alert("Failed to toggle flash. It may not be supported or allowed.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !selectedPose) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    stopCamera();

    setCapturedImages((prev) => ({
      ...prev,
      [selectedPose]: imageData,
    }));
  };

  const handleRetake = () => {
    setCapturedImages((prev) => {
      const updated = { ...prev };
      delete updated[selectedPose];
      return updated;
    });

    startCamera();
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
        showToast("success","Progress uploaded successfully!")
      }
    } catch (err) {
      console.error("File upload or metadata sending failed:", err);
      setIsUploading(false);
    }
  };

  return (
    <div className="h-full relative">
      {isUploading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <GradientSpinner />
        </div>
      )}
      <div className="absolute top-10 left-0 right-0 z-20">
        <ScreenHeader isBack onBack={stopCamera} />
      </div>
      <div className="w-full h-[90%] relative">
        {capturedImages[selectedPose] ? (
          <img
            src={capturedImages[selectedPose]}
            alt="Captured"
            className="h-full w-full object-cover scale-x-[1]"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover scale-x-[1]"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[80%] flex items-center justify-evenly gap-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 z-10">
          <button onClick={toggleFlash} className="text-white text-2xl">
            {flashOn ? <IoMdFlashOff /> : <IoMdFlash />}
          </button>

          <button
            onClick={() => {
              if (allCaptured) {
                handleUpload();
              } else if (capturedImages[selectedPose]) {
                console.log(
                  "capturedImages[selectedPose]: ",
                  capturedImages[selectedPose]
                );
                const currentIndex = poses.findIndex(
                  (p) => p.pose === selectedPose
                );
                const nextUncaptured =
                  poses.find(
                    (p, i) => i > currentIndex && !capturedImages[p.pose]
                  ) || poses.find((p) => !capturedImages[p.pose]);
                if (nextUncaptured) {
                  setSelectedPose(nextUncaptured.pose);
                  console.log("nextUncaptured.pose: ", nextUncaptured.pose);
                }
              } else {
                console.log(
                  "capturedImages[selectedPose]:else ",
                  capturedImages[selectedPose]
                );
                capturePhoto();
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
      <div className="w-full absolute bottom-0 flex flex-col left-0 bg-primary-gradient">
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
                    startCamera();
                  }
                }}
                className={`w-14 h-20 flex items-center justify-center rounded-lg transition-all duration-200 ${
                  selectedPose === pose
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
