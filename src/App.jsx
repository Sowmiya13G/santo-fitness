import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import InstallSplashScreen from "./screens/auth/installSplash";
import "./index.css";
const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  console.log("deferredPrompt: ", deferredPrompt);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  console.log("isPWAInstalled: ", isPWAInstalled);

  useEffect(() => {
    // Detect standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setIsPWAInstalled(isStandalone);

    // Listen for beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Save the event
      console.log("✅ beforeinstallprompt fired");
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Listen for install success
    window.addEventListener("appinstalled", () => {
      console.log("✅ App was installed");
      toast.success("App successfully installed!");
      setDeferredPrompt(null);
      setIsPWAInstalled(true);
    });

    // Cleanup
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show install prompt
      const result = await deferredPrompt.userChoice;
      console.log("Install result:", result.outcome);
      setDeferredPrompt(null);
    }
  };
  if (!isPWAInstalled && deferredPrompt) {
    return <InstallSplashScreen handleInstallClick={handleInstallClick} />;
  }

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Show install button only if app is not yet installed */}
    </>
  );
};

export default App;
