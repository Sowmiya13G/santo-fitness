import { useEffect } from "react";

export default function useAskNotificationPermission() {
  useEffect(() => {
    if (!("Notification" in window)) return; // Not supported

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);
}
