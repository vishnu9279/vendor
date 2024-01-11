import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import {
  FIREBASE_CONFIG_JSON,
  FIREBASE_CONFIG_PUBLIC_KEY,
} from "../api-config/configuration";

const firebaseApp = initializeApp(FIREBASE_CONFIG_JSON);

export const messaging = getMessaging(firebaseApp);
const publicKey = FIREBASE_CONFIG_PUBLIC_KEY;
import axiosInstance from "../api-config/axiosInstance";

function generateDeviceId() {
  const navigatorInfo = navigator.userAgent || navigator.vendor || window.opera;
  const screenResolution = window.screen.width + "x" + window.screen.height;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Combine relevant information to create a pseudo-unique identifier
  const pseudoUniqueId = `${navigatorInfo}-${screenResolution}-${timeZone}`;

  // Optionally, you might want to hash or encode the identifier for privacy reasons

  return pseudoUniqueId;
}

const saveFcomToken = async(fcmToken,deviceId)=>{
  try {
    const response = await axiosInstance.post("/other/saveFcmToken", {
      fcmToken,
      deviceId,
    });
    console.log("fcm saved", response);
  } catch (error) {
    console.error("Error",error);
  }
}

export const generateFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("====================================");
    console.log(permission);
    console.log("====================================");
    if (permission === "granted") {
      const fcmToken = await getToken(messaging, { vapidKey: publicKey });
      console.log("fcmToken", fcmToken);
      const deviceId = generateDeviceId();
      await saveFcomToken(fcmToken,deviceId)
    }
  } catch (error) {
    console.error("error", error);
  }
};

