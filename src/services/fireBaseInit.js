import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { FIREBASE_CONFIG_JSON,FIREBASE_CONFIG_PUBLIC_KEY } from "../api-config/configuration";

const firebaseApp = initializeApp(FIREBASE_CONFIG_JSON);

export const messaging = getMessaging(firebaseApp);
const publicKey = FIREBASE_CONFIG_PUBLIC_KEY

export const generateFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("====================================");
    console.log(permission);
    console.log("====================================");
    if (permission === "granted") {
      const fcmToken = await getToken(messaging, { vapidKey: publicKey });
      console.log("fcmToken", fcmToken);
    }
  } catch (error) {
    console.error("error",error);
  }
};
