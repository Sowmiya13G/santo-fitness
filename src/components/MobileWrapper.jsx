import { useEffect, useState } from "react";

function MobileWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) {
    return (
      <div className="h-screen flex items-center justify-center text-center px-4 bg-black text-white">
        <p className="text-lg">
          🚫 This app is only supported on mobile devices.<br />
          Please switch to a smaller screen to continue.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export default MobileWrapper;
