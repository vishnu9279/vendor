const FIREBASE_CONFIG_JSON = {
  apiKey: process.env.FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL:process.env.FIREBASE_CONFIG_DATABASE_URL,
    projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDERID,
    appId: process.env.FIREBASE_CONFIG_APP_ID,
    measurementId: process.env.FIREBASE_CONFIG_MEASUREMENT_ID
}
const FIREBASE_CONFIG_PUBLIC_KEY = process.env.FIREBASE_CONFIG_PUBLIC_KEY;
module.exports = {
  FIREBASE_CONFIG_JSON,
  FIREBASE_CONFIG_PUBLIC_KEY
}