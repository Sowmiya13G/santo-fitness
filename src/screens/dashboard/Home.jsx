import { useState } from "react";
import CameraCapture from "../../components/CameraCapture";

function Home() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleImageCapture = (imgData) => {
    setCapturedImage(imgData);
    setShowCamera(false);
  };

  return (
    <div className="p-4 font-poppin">
      {!showCamera && (
        <button
          onClick={() => setShowCamera(true)}
          className="bg-red text-white px-6 py-3 rounded"
        >
          Open Camera
        </button>
      )}

      {showCamera && <CameraCapture onCapture={handleImageCapture} />}

      {!showCamera && capturedImage && (
        <div className="mt-4 flex justify-center">
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded shadow-md max-w-full h-auto scale-x-[-1]"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
