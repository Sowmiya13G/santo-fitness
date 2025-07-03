import { useEffect, useState } from "react";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";

function App() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('👍 beforeinstallprompt fired');
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      if (outcome === 'accepted') {
        setShowInstallButton(false);
        setDeferredPrompt(null);
      }
    }
  };

  useEffect(() => {
    const isNew = !localStorage.getItem("hasOnboarded");
    setIsNewUser(isNew);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasOnboarded", "true");
    setIsNewUser(false);
  };

  return (
    <>
      {isNewUser ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <>
          <Home />
          {showInstallButton && (
            <button
              onClick={handleInstallClick}
              className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Install App
            </button>
          )}
        </>
      )}
    </>
  );
}

export default App;
