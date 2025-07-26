import { useEffect, useRef, useState } from "react";
import { FaCamera, FaRedo, FaUpload } from "react-icons/fa";
import { IoMdFlash, IoMdFlashOff } from "react-icons/io";
import { TbEdit } from "react-icons/tb";

import BackActive from "../../assets/images/back-active.svg";
import Back from "../../assets/images/back.svg";
import FrontActive from "../../assets/images/front-active.svg";
import Front from "../../assets/images/front.svg";
import LeftActive from "../../assets/images/left-active.svg";
import Left from "../../assets/images/left.svg";
import RightActive from "../../assets/images/right-active.svg";
import Right from "../../assets/images/right.svg";

import ScreenHeader from "@/components/screen-header";
import { uploadFile } from "@/features/user/user-api";
import { uploadProgressData } from "@/features/progress/progress-api";

const poses = [
  { active: FrontActive, inactive: Front, pose: "Front" },
  { active: RightActive, inactive: Right, pose: "Right" },
  { active: BackActive, inactive: Back, pose: "Back" },
  { active: LeftActive, inactive: Left, pose: "Left" },
];

function GradientSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
    </div>
  );
}


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

  const startCamera = async () => {
    stopCamera();
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
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

    const videoTrack = stream
      .getVideoTracks()
      .find((track) => track.getSettings().facingMode === facingMode);

    if (!videoTrack) return;

    const capabilities = videoTrack.getCapabilities();
    if (!capabilities.torch) {
      alert("Flash not supported on this device");
      return;
    }

    try {
      await videoTrack.applyConstraints({
        advanced: [{ torch: !flashOn }],
      });
      setFlashOn((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle flash:", err);
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
      console.log("Upload success:", uploadResponse);

      const imagePayload = entries.map(({ pose }, index) => ({
        url: uploadResponse?.urls[index],
        progressType: pose.toLowerCase(),
      }));

      const finalPayload = {
        images: imagePayload,
        // note: "Week 1 - visible muscle definition"
      };

      const result = await uploadProgressData(finalPayload);
      console.log("Metadata sent:", result);
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
            className="h-full w-full object-cover scale-x-[-1]"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover scale-x-[-1]"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] flex items-center justify-evenly gap-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 z-10">
          <button onClick={toggleFlash} className="text-white text-2xl">
            {flashOn ? <IoMdFlashOff /> : <IoMdFlash />}
          </button>

          <button
            onClick={allCaptured ? handleUpload : capturePhoto}
            className="bg-white p-3 rounded-full border-4 border-white text-red-600"
            aria-label={allCaptured ? "Upload Images" : "Capture Photo"}
            disabled={isDisabled}
          >
            {allCaptured ? <FaUpload size={23} /> : <FaCamera size={24} />}
          </button>

          <button onClick={handleRetake} className="text-white text-xl">
            <FaRedo />
          </button>
        </div>
      </div>

      <div className="w-full absolute bottom-0 flex flex-col left-0 bg-primary-gradient">
        <div className="flex gap-4 px-2 py-5 rounded-full h-full w-full justify-evenly z-10">
          {poses.map(({ active, inactive, pose }) => {
            const isCaptured = capturedImages[pose];
            const isSelected = selectedPose === pose;

            const handlePoseClick = () => {
              if (!isCaptured || isSelected) {
                setSelectedPose(pose);
                if (!isCaptured) startCamera();
              }
            };

            const handleEditClick = (e) => {
              e.stopPropagation();
              setSelectedPose(pose);
              setCapturedImages((prev) => {
                const updated = { ...prev };
                delete updated[pose];
                return updated;
              });
              startCamera();
            };

            return (
              <div key={pose} className="relative w-14 h-20">
                <button
                  onClick={handlePoseClick}
                  className={`w-full h-full flex items-center justify-center rounded-lg transition-all duration-200 ${
                    isSelected
                      ? "bg-feild_primay border-icon border"
                      : "bg-white/20"
                  } ${isCaptured && !isSelected ? "opacity-60" : ""}`}
                >
                  <img
                    src={isSelected ? active : inactive}
                    alt={pose}
                    className="w-8 h-16 object-contain"
                  />
                </button>

                {isCaptured && (
                  <div
                    onClick={handleEditClick}
                    className={`absolute top-0 right-0 p-1 rounded-full text-xs cursor-pointer ${
                      isSelected ? "text-icon" : "text-white"
                    }`}
                  >
                    <TbEdit />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
