import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes"; // adjust the import path if needed

const App = () => {
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    const checkPWAInstallation = () => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsPWAInstalled(isStandalone);
      console.log("PWA installed (standalone mode):", isStandalone);
    };

    checkPWAInstallation();
  }, []);

  if (!isPWAInstalled) {
    return (
      <div className="min-w-full mx-auto text-center justify-center flex ">
        {isPWAInstalled
          ? "✅ Running as installed PWA"
          : "ℹ️ Running in browser (not standalone)"}
      </div>
    );
  }
  return (
    <>
      <AppRoutes />

      <ToastContainer position="top-center" autoClose={3000} />

      {/* Optional debug message */}
    </>
  );
};

export default App;
