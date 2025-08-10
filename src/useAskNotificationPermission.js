import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useAskNotificationPermission() {
  const [notifAsked, setNotifAsked] = useState(
    () => localStorage.getItem("notifAsked") === "true"
  );

  useEffect(() => {
    // Only run if notifications are supported
    if (!("Notification" in window)) return;

    // If permission already granted — show success and stop
    if (Notification.permission === "granted" && !notifAsked) {
      toast.success("Notifications enabled!");
      localStorage.setItem("notifAsked", "true");
      setNotifAsked(true);
      return;
    }

    // If permission is default — ask
    if (!notifAsked && Notification.permission === "default") {
      const timer = setTimeout(() => {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            toast.success("Notifications enabled!");
            localStorage.setItem("notifAsked", "true"); // ✅ Only store when granted
            setNotifAsked(true);
          } else if (permission === "denied") {
            toast.info("You can enable notifications in browser settings.");
            // ❌ Don't set localStorage here, so it will ask again next time
          }
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notifAsked]);
}
