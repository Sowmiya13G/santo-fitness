import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
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

  return <AppRoutes />;
}

export default App;
