import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AppRoutes from "./routes/app-routes";
import InstallSplashScreen from "./screens/auth/install-splash";
// import { logoutUser } from "./utils/helper";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
const App = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // logoutUser(dispatch, navigate);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
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
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Listen for install success
    window.addEventListener("appinstalled", () => {
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
      setDeferredPrompt(null);
    }
  };
  if (!isPWAInstalled && deferredPrompt) {
    return <InstallSplashScreen handleInstallClick={handleInstallClick} />;
  }

  return (
    <div className="h-screen-dynamic  hide-scrollbar w-full">
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
