import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { onboardingContent } from "../../constants/staticData";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const isLastStep = step === onboardingContent.length - 1;
  const totalSteps = onboardingContent.length;
  const progressPercent = ((step + 1) / totalSteps) * 100;

  const { image, title, content } = onboardingContent[step];

  const handleNext = () => {
    if (!isLastStep) {
      setStep((prev) => prev + 1);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen-dynamic w-screen flex flex-col justify-between bg-white">
      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={image}
          alt={title}
          className="object-contain w-full max-h-[60vh]"
        />
      </div>

      {/* Text Content */}
      <div className="px-6 pb-6">
        <h2 className="text-black text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-base">{content}</p>
      </div>

      {/* Button + Progress */}
      <div className="flex justify-end items-center px-6 pb-6">
        <div className="relative w-16 h-16">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 36 36"
          >
            {/* Track Circle */}
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            {/* Progress Path */}
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray={`${progressPercent}, 100`}
              className="transition-all duration-300"
            />
          </svg>

          {/* Button */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       bg-primary text-white rounded-full p-3 shadow-md hover:scale-105 transition"
          >
            <FaAngleRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
