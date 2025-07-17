import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate(isLoggedIn ? "/home" : "onboarding"), 200);
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [isLoggedIn, navigate]);

  return (
    <div className="h-screen-dynamic overflow-hidden m-auto fixed inset-0 bg-primary-gradient text-white flex flex-col items-center justify-between p-8 ">
      <div className="flex flex-col items-center justify-center mt-2 h-[70%]">
        <img
          src={logo}
          alt="App Logo"
          className="w-50 h-50 mb-6 object-contain"
        />
        <h2 className="text-4xl font-bold ">Santo Fitness</h2>
        <h2 className="text-xl text-bg_primary  mt-5">Everybody Can Train</h2>
      </div>

      <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden mt-4">
        <div
          className="h-full bg-white rounded-full transition-all duration-75"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SplashScreen;
