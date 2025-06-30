import { useEffect, useState } from "react";
// import { SplashScreen } from "./screens/splash";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const isNew = !localStorage.getItem("hasOnboarded");
    setIsNewUser(isNew);

    const splashTimer = setTimeout(() => {
      // setShowSplash(false);
    }, 1500); 

    return () => clearTimeout(splashTimer);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasOnboarded", "true");
    setIsNewUser(false);
  };

  // if (showSplash) return <SplashScreen />;

  if (isNewUser) return <Onboarding onComplete={handleOnboardingComplete} />;

  return <Home />;
}

export default App;
