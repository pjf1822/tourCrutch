import { createContext, useContext } from "react";
import { uploadUserProfilePic } from "../helpers.js";

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
