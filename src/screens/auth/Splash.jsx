import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const SplashScreen = ({ isNewUser }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (!isNewUser) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            navigate('/dashboard');
            return 100;
          }
          return prev + 1;
        });
      }, 5);
    }

    return () => clearInterval(timer);
  }, [isNewUser, navigate]);

  const handleStart = () => {
    navigate("/onboarding");
  };

  return (
    <div className="fixed inset-0 bg-primary-gradient text-white flex flex-col items-center justify-between p-8 z-50">
      <div className="flex flex-col items-center justify-center mt-24">
        <img
          src={logo}
          alt="App Logo"
          className="w-50 h-50 mb-6 object-contain"
        />
        <h2 className="text-4xl font-bold font-poppin">Santo Fitness</h2>
        <h2 className="text-xl text-bg_primary font-poppin mt-5">
          Everybody Can Train
        </h2>
      </div>

      {isNewUser ? (
        <button
          onClick={handleStart}
          className="bg-white text-primary-500 px-6 py-3 rounded-full font-semibold shadow-md mt-8 bottom-5"
        >
          Get Started
        </button>
      ) : (
        <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
