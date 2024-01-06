import { initializeApp } from "firebase/app";
import { getMessaging,getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyACL02H72KZ6KZmp15-hbBTrHZkPEPOtsY",
    authDomain: "junbazarapp.firebaseapp.com",
    databaseURL: "https://junbazarapp-default-rtdb.firebaseio.com",
    projectId: "junbazarapp",
    storageBucket: "junbazarapp.appspot.com",
    messagingSenderId: "591668782120",
    appId: "1:591668782120:web:65364265d2346ba834411d",
    measurementId: "G-64QCLZBNM3"
};

const firebaseApp = initializeApp(firebaseConfig);

export const messaging = getMessaging(firebaseApp);


const publicKey = "BMvw3tJpxyBXb-kl3cm09i8klqzNlK-8SvVxIGuvaXpuDuwhTVpuFDE5ACYSPmedfKQGoP8JFhlGPDxb4PgdGSo";

export const generateFCMToken = async () => {
  try {
    const permission =await Notification.requestPermission();
    console.log('====================================');
    console.log(permission);
    console.log('====================================');
    if(permission === "granted"){
      const fcmToken =  await getToken(messaging,{vapidKey:publicKey})
console.log("fcmToken", fcmToken);
    }
  } catch (error) {
    
  }
};