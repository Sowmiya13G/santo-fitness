import { useEffect, useRef, useState } from "react";
import { FaCamera, FaRedo } from "react-icons/fa";
import { IoMdFlash, IoMdFlashOff } from "react-icons/io";

import Back from "../../assets/images/back.svg";
import Front from "../../assets/images/front.svg";
import FrontActive from "../../assets/images/front-active.svg";
import BackActive from "../../assets/images/back-active.svg";
import LeftActive from "../../assets/images/left-active.svg";
import RightActive from "../../assets/images/right-active.svg";

import Left from "../../assets/images/left.svg";
import Right from "../../assets/images/right.svg";

export default function CameraScreen({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [stream, setStream] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const poses = [
    { active: FrontActive, inactive: Front, pose: "Front" },
    { active: RightActive, inactive: Right, pose: "Right" },
    { active: BackActive, inactive: Back, pose: "Back" },
    { active: LeftActive, inactive: Left, pose: "Left" },
  ];
  const [selectedPose, setSelectedPose] = useState("Front");

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

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
      setStream(newStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const toggleFlash = async () => {
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
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    stopCamera();
    setCapturedImage(imageData);
    if (onCapture) onCapture(imageData);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="h-full">
      <div className="w-full h-[90%] relative">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="h-full w-full object-cover scale-x-[-1]"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`h-full w-full object-cover scale-x-[-1]`}
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] flex items-center justify-evenly gap-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 z-10">
          <button onClick={toggleFlash} className="text-white text-2xl">
            {flashOn ? <IoMdFlashOff /> : <IoMdFlash />}
          </button>
          <button
            onClick={capturePhoto}
            className="bg-white p-3 rounded-full border-4 border-white text-red-600"
            aria-label="Capture Photo"
            disabled={!!capturedImage}
          >
            <FaCamera size={24} />
          </button>
          <button onClick={handleRetake} className="text-white text-xl">
            <FaRedo />
          </button>
        </div>
      </div>

      <div className="w-full absolute bottom-0 flex flex-col left-0 bg-primary-gradient">
        <div className="flex gap-4 px-2 py-5 rounded-full h-full w-full justify-evenly z-10">
          {poses.map(({ active, inactive, pose }) => (
            <button
              key={pose}
              onClick={() => setSelectedPose(pose)}
              className={`w-14 h-20 flex items-center justify-center rounded-lg transition-all duration-200 ${
                selectedPose === pose
                  ? "bg-feild_primay border-icon border"
                  : "bg-white/20"
              }`}
            >
              <img
                src={selectedPose === pose ? active : inactive}
                alt={pose}
                className="w-8 h-16 object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
