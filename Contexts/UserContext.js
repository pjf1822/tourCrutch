import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import GlobalLoader from "../GlobalLoader";
import { FIREBASE_AUTH } from "../firebaseConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCompleted, setAuthCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
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
