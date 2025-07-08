// pushNotification.js
import { messaging, getToken } from "../../firebase";

const VAPID_KEY =
  "BHlaAMHjZCKXfxWz2GeFVWWXQAAtXPaM-jXdz1fVyJpmkbyLIbbii7jdHO5VyzldnQA04EL6Bqg4JdTYOLy9LkI";
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log('currentToken: ', currentToken);
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      // Send token to server
      return currentToken;
    } else {
      console.warn(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
  }
};
