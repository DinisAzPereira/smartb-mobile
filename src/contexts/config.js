import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { keys } from "./keys";

//Login persistence
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

const firebaseConfig = {
    apiKey: keys.REACT_APP_FIREBASE_KEY,
    authDomain: keys.REACT_APP_FIREBASE_DOMAIN,
    projectId: keys.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: keys.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: keys.REACT_APP_FIREBASE_SENDER_ID,
};

const app = initializeApp(firebaseConfig);

export default getFirestore();
export const firebase = {
    db: getFirestore(),
    auth: initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
};