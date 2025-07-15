// pushNotification.js
import { getToken, messaging } from "../../firebase";

const VAPID_KEY =
  "BHlaAMHjZCKXfxWz2GeFVWWXQAAtXPaM-jXdz1fVyJpmkbyLIbbii7jdHO5VyzldnQA04EL6Bqg4JdTYOLy9LkI";
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      localStorage.setItem("fcmToken", currentToken);
      return currentToken;
    } else {
      console.warn(
        "No registration token available. Request permission to generate one.",
      );
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
  }
};
