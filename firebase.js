// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAaRhFwG2OyxnP5DclMioQ3zaTBheaeuOk",
  authDomain: "santo-fcm.firebaseapp.com",
  projectId: "santo-fcm",
  storageBucket: "santo-fcm.firebasestorage.app",
  messagingSenderId: "803941658163",
  appId: "1:803941658163:web:41b70107c8f032cb577d46",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
