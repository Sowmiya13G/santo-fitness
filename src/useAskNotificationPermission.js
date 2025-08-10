import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useAskNotificationPermission() {
  const [notifAsked, setNotifAsked] = useState(
    () => localStorage.getItem("notifAsked") === "true"
  );

  useEffect(() => {
    // Don't ask if we've already asked before or permission is not "default"
    if (!notifAsked && "Notification" in window && Notification.permission === "default") {
      const timer = setTimeout(() => {
        Notification.requestPermission().then((permission) => {
          localStorage.setItem("notifAsked", "true"); // Remember in localStorage
          setNotifAsked(true); // Remember in state too

          if (permission === "granted") {
            toast.success("Notifications enabled!");
          } else if (permission === "denied") {
            toast.info("You can enable notifications in browser settings.");
          }
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notifAsked]);
}
