// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import { useAuth } from "../../hooks/useAuth";
// import Button from "../../components/Button";

// const SplashScreen = () => {
//   const [progress, setProgress] = useState(0);
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate("/home", { replace: true });
//     }
//   }, [isLoggedIn, navigate]);
  

//   useEffect(() => {
//     if (isLoggedIn) {
//       const timer = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(timer);
//             setTimeout(() => navigate("/home"), 200);
//             return 100;
//           }
//           return prev + 1;
//         });
//       }, 10);

//       return () => clearInterval(timer);
//     }
//   }, [navigate]);

//   const handleStart = () => {
//     navigate("/onboarding");
//   };

//   return (
//     <div className="min-h-screen w-screen fixed inset-0 bg-primary-gradient text-white flex flex-col items-center justify-between p-8 z-50">
//       <div className="flex flex-col items-center justify-center mt-24">
//         <img
//           src={logo}
//           alt="App Logo"
//           className="w-50 h-50 mb-6 object-contain"
//         />
//         <h2 className="text-4xl font-bold font-poppin">Santo Fitness</h2>
//         <h2 className="text-xl text-bg_primary font-poppin mt-5">
//           Everybody Can Train
//         </h2>
//       </div>

//       {!isLoggedIn ? (
//         <Button onClick={handleStart} variant="secondary">Get Started</Button>
//       ) : (
//         <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden mt-4">
//           <div
//             className="h-full bg-white rounded-full transition-all duration-75"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SplashScreen;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";

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
    if (isLoggedIn) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => navigate("/home"), 200);
            return 100;
          }
          return prev + 1;
        });
      }, 10);

      return () => clearInterval(timer);
    }
  }, [navigate, isLoggedIn]);

  const handleStart = () => {
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen w-screen fixed inset-0 bg-primary-gradient text-white flex flex-col justify-between items-center p-6 sm:p-10 z-50">
      {/* Logo & Titles */}
      <div className="flex flex-col items-center justify-center mt-20 sm:mt-32">
        <img
          src={logo}
          alt="App Logo"
          className="w-32 h-32 sm:w-40 sm:h-40 mb-6 object-contain"
        />
        <h1 className="text-3xl sm:text-4xl font-bold font-poppin text-center">
          Santo Fitness
        </h1>
        <h2 className="text-lg sm:text-xl text-bg_primary font-poppin mt-4 text-center">
          Everybody Can Train
        </h2>
      </div>

      {/* Button or Progress Bar */}
      <div className="w-full max-w-xs mt-10 mb-4">
        {!isLoggedIn ? (
          <Button onClick={handleStart} variant="secondary" className="w-full">
            Get Started
          </Button>
        ) : (
          <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
