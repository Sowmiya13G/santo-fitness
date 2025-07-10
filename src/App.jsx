import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

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

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Show install button only if app is not yet installed */}
      {!isPWAInstalled && deferredPrompt && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button onClick={handleInstallClick} style={{ padding: "0.5rem 1rem" }}>
            📲 Install App
          </button>
        </div>
      )}
    </>
  );
};

export default App;
