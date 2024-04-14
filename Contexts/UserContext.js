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
    console.log("is it a trigger");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log(authUser, "the auth user");
      setUser(authUser);
      setAuthCompleted(true);
    });

    return () => unsubscribe();
  }, [profileUpdated]);

  if (!authCompleted) {
    return null;
  }

  // console.log(user, "show me the full user in the context page. ");
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
