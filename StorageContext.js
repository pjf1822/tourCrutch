import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { showToast } from "./helpers.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "firebase/auth";
import { FIREBASE_STORAGE } from "./firebaseConfig";
import { useUser } from "./UserContext.js";
import { createContext, useContext } from "react";

const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const { user, setUser } = useUser();

  const uploadUserProfilePic = async (imageUri) => {
    const uploadCountString = await AsyncStorage.getItem("uploadCount");
    let uploadCount = uploadCountString ? parseInt(uploadCountString) : 0;

    if (uploadCount >= 10) {
      showToast("Upload limit exceeded.", false, "top");
      return;
    }

    console.log(user, "show me the user");
    if (!user || !user.getIdToken) {
      showToast("User information is missing or incomplete.", false, "top");
      return;
    }
    try {
      const storageRef = ref(
        FIREBASE_STORAGE,
        `user-profiles/${user?.uid}/profile-pic.jpg`
      );

      const response = await fetch(imageUri);
      const blob = await response.blob();
      const ready = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setUser({ ...user, photoURL: downloadURL });

      await updateProfile(user, {
        photoURL: downloadURL,
      });
      await AsyncStorage.setItem("uploadCount", (uploadCount + 1).toString());
      showToast("Profile pic added!", true, "top");
    } catch (error) {
      showToast(error, false, "top");

      console.error(
        "Error uploading image:",
        error.code,
        error.message,
        error.serverResponse
      );
    }
  };

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
