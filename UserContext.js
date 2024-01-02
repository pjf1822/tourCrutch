import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "./firebaseConfig";
import GlobalLoader from "./GlobalLoader";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

const UserContext = createContext();
const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const { user } = useUser();

  const uploadUserProfilePic = async (imageUri) => {
    try {
      const storageRef = ref(
        FIREBASE_STORAGE,
        `user-profiles/${user?.uid}/profile-pic.jpg`
      );

      const response = await fetch(imageUri);

      const blob = await response.blob();

      const shit = await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      const responseTwo = await updateProfile(user, {
        photoURL: downloadURL,
      });
      console.log(responseTwo);
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.code,
        error.message,
        error.serverResponse
      );
    }
  };

  // Other storage-related functions...

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
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCompleted, setAuthCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      // console.log(authUser, "the auth user");
      setUser(authUser);
      setAuthCompleted(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
