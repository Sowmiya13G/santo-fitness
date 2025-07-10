import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import PWAInstallPrompt from "./components/pwaInstallComponent";

function isInStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function App() {
  const [isInstalled, setIsInstalled] = useState(true); // Default true for SSR safety

  useEffect(() => {
    const checkInstallStatus = () => {
      const installed = isInStandaloneMode();
      setIsInstalled(installed);
    };

    checkInstallStatus();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("👍 beforeinstallprompt fired");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("DOMContentLoaded", checkInstallStatus);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("DOMContentLoaded", checkInstallStatus);
    };
  }, []);

  if (!isInstalled) {
    return (
      <div style={{ padding: 30, textAlign: "center" }}>
        <h1>📲 Install Required</h1>
        <p>This app only works when installed on your device.</p>
        <p>Tap the <strong>“Install”</strong> or <strong>“Add to Home Screen”</strong> option in your browser.</p>
        <PWAInstallPrompt />
      </div>
    );
  }

  return (
    <>
      <AppRoutes />
      <PWAInstallPrompt />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
