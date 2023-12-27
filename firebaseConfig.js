import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrclspxflUHoYTDLtSRJE0g2us7cC7aW8",
  authDomain: "tourcrutch.firebaseapp.com",
  projectId: "tourcrutch",
  storageBucket: "tourcrutch.appspot.com",
  messagingSenderId: "377517638642",
  appId: "1:377517638642:web:90b8c2d97708ab7f68a16b",
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
