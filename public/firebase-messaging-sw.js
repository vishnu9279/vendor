/* eslint-disable no-restricted-globals */
import { initializeApp } from "firebase/app";
import { getMessaging,onBackgroundMessage } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyACL02H72KZ6KZmp15-hbBTrHZkPEPOtsY",
    authDomain: "junbazarapp.firebaseapp.com",
    databaseURL: "https://junbazarapp-default-rtdb.firebaseio.com",
    projectId: "junbazarapp",
    storageBucket: "junbazarapp.appspot.com",
    messagingSenderId: "591668782120",
    appId: "1:591668782120:web:65364265d2346ba834411d",
    measurementId: "G-64QCLZBNM3"
});


const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
 
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

