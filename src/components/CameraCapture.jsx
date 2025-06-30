import { useRef, useState, useEffect } from "react";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [stream, setStream] = useState(null);
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    // Stop any existing stream first
    stopCamera();
  
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
        },
      });
  
      const video = videoRef.current;
      if (video) {
        video.srcObject = newStream;
        video.play();
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
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
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
    if (onCapture) onCapture(imageData);
  };

  return (
    <div className="flex flex-col h-screen items-center gap-4 p-4 relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-[80%] rounded shadow-md object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2">
        <button onClick={toggleCamera} className=" text-white">
          Flip
        </button>
        <button
          onClick={capturePhoto}
          className="bg-black border-4 border-white p-10 rounded-full mt-4"
          aria-label="Capture Photo"
        ></button>
        <button onClick={toggleFlash} className=" text-white">
          {flashOn ? "Flash Off" : "Flash On"}
        </button>
      </div>
    </div>
  );
}
