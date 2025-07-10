import React, { useEffect, useState } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Do not show if already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredPrompt = e;
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
      } else {
        console.log("❌ User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  return (
    <>
      {showInstallButton && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
          <button
            onClick={handleInstallClick}
            style={{
              padding: "12px 24px",
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
          >
            Install App
          </button>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
