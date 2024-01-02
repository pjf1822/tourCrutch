import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { showToast } from "../helpers.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "firebase/auth";
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { createContext, useContext } from "react";
import { useUser } from "./UserContext.js";
import { uploadUserProfilePic } from "../helpers.js"; // Adjust the path as needed

const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const storageContextValue = {
    uploadUserProfilePic,
  };
  return (
    <StorageContext.Provider value={storageContextValue}>
      {children}
    </StorageContext.Provider>
  );
};
export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
};
