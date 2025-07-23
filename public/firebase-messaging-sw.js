/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyAaRhFwG2OyxnP5DclMioQ3zaTBheaeuOk",
  authDomain: "santo-fcm.firebaseapp.com",
  projectId: "santo-fcm",
  storageBucket: "santo-fcm.firebasestorage.app",
  messagingSenderId: "803941658163",
  appId: "1:803941658163:web:41b70107c8f032cb577d46",
});

firebase.messaging();

self.addEventListener("notificationclick", function (event) {

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        for (const client of clientList) {
          if (client.url.includes("localhost:5173") && "focus" in client) {
            return client.focus(); // Will only focus if window is not minimized
          }
        }
        if (clients.openWindow) {
          return clients.openWindow("http://localhost:5173/onboarding");
        }
      }),
  );
});

// messaging.onBackgroundMessage((payload) => {
//   const { title, body, url } = payload.notification;

//   self.registration.showNotification(title, {
//     body,
//     icon: "/icon.png",
//     data: { url }, // ✅ Important
//   });
// });

// messaging.onBackgroundMessage((payload) => {

//   const { title, body } = payload.notification;

// //   self.registration.showNotification(title, {
// //     body,
// //     icon: "/icon.png",
// //     data: {
// //       // 👇 Ensure the link is stored in the notification data
// //       url: payload?.fcmOptions?.link || "http://localhost:5173",
// //     },
// //   });
// });
