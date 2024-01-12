import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import GlobalLoader from "../components/GlobalLoader.js";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { Text } from "react-native";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCompleted, setAuthCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserFromFirebase = () => {
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
      fetchUserFromFirebase();
    };

    if (user) {
      updateUserProfile();
    }
  }, [user]);

  if (loading) {
    return <Text>loading</Text>;
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUserFromFirebase, loading, setLoading }}
    >
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
