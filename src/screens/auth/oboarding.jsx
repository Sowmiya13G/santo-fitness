import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// constants
import { onboardingContent } from "../../constants/static-data";
export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(false);
  const isLastStep = step === onboardingContent.length - 1;
  const totalSteps = onboardingContent.length;
  const progressPercent = ((step + 1) / totalSteps) * 100;

  const { image, title, content } = onboardingContent[step];

  const handleNext = () => {
    setAnimate(true); // start animation

    if (!isLastStep) {
      setStep((prev) => (prev + 1) % onboardingContent.length);
      setTimeout(() => {
        setAnimate(false); // reset animation
      }, 300);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-full overflow-hidden  w-screen  flex flex-col justify-between bg-white">
      <img
        src={image}
        alt={title}
        className={`object-cover w-full h-auto max-h-[70%] ${
          !animate ? "" : "animate-zoom-in"
        }`}
      />
      <div className="mx-5 max-w-md ">
        <h2
          className={`text-font_primary text-2xl font-bold mb-2  ${
            !animate ? "" : "animate-zoom-in"
          }`}
        >
          {title}
        </h2>
        <p className={`text-gray-600  ${!animate ? "" : "animate-zoom-in"}`}>
          {content}
        </p>
      </div>

      <div className="flex justify-end items-center p-5 w-full">
        <div className="relative w-16 h-16">
          <svg
            className="absolute top-0 left-0 w-full h-full"
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
          <button
            onClick={handleNext}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       bg-primary text-white rounded-full p-3 shadow-md hover:scale-105 transition focus:outline-none focus:ring-0"
          >
            <FaAngleRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
