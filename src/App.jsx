import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("👍 beforeinstallprompt fired");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
