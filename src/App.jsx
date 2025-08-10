import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AppRoutes from "./routes/app-routes";
import InstallSplashScreen from "./screens/auth/install-splash";
import { registerSW } from "virtual:pwa-register";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  // ✅ Service Worker update registration
  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        toast.info(
          <div>
            <span>A new version is available.</span>
            <button
              style={{
                marginLeft: "10px",
                padding: "4px 8px",
                background: "#4cafef",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => updateSW()}
            >
              Update
            </button>
          </div>,
          { autoClose: false }
        );
      },
      onOfflineReady() {
        toast.success("App is ready to work offline");
      },
    });
  }, []);

  // ✅ Viewport height fix for mobile
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  // ✅ Install prompt handling
  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setIsPWAInstalled(isStandalone);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      toast.success("App successfully installed!");
      setDeferredPrompt(null);
      setIsPWAInstalled(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
    }
  };

  // ✅ If install prompt available, show splash
  if (!isPWAInstalled && deferredPrompt) {
    return <InstallSplashScreen handleInstallClick={handleInstallClick} />;
  }

  return (
    <div className="h-screen-dynamic hide-scrollbar w-full">
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
