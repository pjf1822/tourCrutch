import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import GlobalLoader from "../GlobalLoader";
import { FIREBASE_AUTH } from "../firebaseConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCompleted, setAuthCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserFromFirebase = () => {
    console.log("we are fetching the user");

    setLoading(true);
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      setAuthCompleted(true);
      setLoading(false);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchUserFromFirebase();
  }, []);

  useEffect(() => {
    const updateUserProfile = async () => {
      console.log("we called the useEffect when the user changes");
      fetchUserFromFirebase();
    };

    if (user) {
      updateUserProfile();
    }
  }, [user]);

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserFromFirebase }}>
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
