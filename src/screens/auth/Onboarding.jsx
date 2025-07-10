import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// constants
import { onboardingContent } from "../../constants/staticData";
import AuthLayout from "../../routes/AuthLayout";

export default function Onboarding({ onComplete }) {
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
    <AuthLayout>
      <img
        src={image}
        alt={title}
        className="object-contain w-full max-h-[60%]"
      />

      <div className="mx-5">
        <h2 className="text-black text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>

      <div className="flex justify-end items-center p-5">
        <button
          onClick={handleNext}
          className="relative w-16 h-16 bg-transparent hover:border-0 transition outline-none focus:outline-none focus:ring-0 focus-visible:ring-0"
        >
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox="0 0 36 36"
          >
            <path
              className="text-gray-300"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="text-primary transition-all duration-300"
              d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progressPercent}, 100`}
            />
          </svg>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 bg-primary text-white rounded-full p-3"
          >
            <FaAngleRight className="w-4 h-4" />
          </div>
        </button>
      </div>
      {/* <div className="flex justify-end items-center p-5">
        <button
          onClick={handleNext}
          className="relative w-16 h-16 bg-transparent hover:scale-105 transition focus:outline-none focus:ring-0"
        >
          <svg
            className="absolute top-0 left-0 w-full h-full focus:outline-none focus:ring-0"
            viewBox="0 0 36 36"
          >
            <path
              className="text-gray-300 focus:outline-none focus:ring-0"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="text-primary transition-all duration-300 focus:outline-none focus:ring-0"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progressPercent}, 100`}
            />
          </svg>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       bg-primary text-white rounded-full p-3"
          >
            <FaAngleRight className="w-4 h-4" />
          </div>
        </button>
      </div> */}
    </AuthLayout>
  );
}
