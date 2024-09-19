import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCompleted, setAuthCompleted] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const toggleProfileUpdated = () => {
    setProfileUpdated((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setAuthCompleted(true);
    });

    return () => unsubscribe();
  }, [profileUpdated]);

  if (!authCompleted) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser, toggleProfileUpdated }}>
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
