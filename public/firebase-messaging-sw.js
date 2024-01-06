/* eslint-disable no-restricted-globals */
import { initializeApp } from "firebase/app";
import { getMessaging,onBackgroundMessage } from "firebase/messaging/sw";
import {FIREBASE_CONFIG_JSON} from "../src/api-config/configuration"
const firebaseApp = initializeApp(FIREBASE_CONFIG_JSON);


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

