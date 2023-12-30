import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Toast from "react-native-root-toast";
import { FIREBASE_AUTH } from "./firebaseConfig";

export const handleSignUp = async (
  auth,
  email,
  password,
  displayName,
  setUser
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response, "the response");
    const userWithDisplayName = { ...response.user, displayName };

    await updateProfile(response.user, {
      displayName: displayName,
    });
    setUser(userWithDisplayName);

    const userCredentials = JSON.stringify({
      accessToken: response?.user?.accessToken,
    });

    await AsyncStorage.setItem("userCredentials", userCredentials);
  } catch (error) {
    console.log(error, "the error ");
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      let toast = Toast.show("Invalid Email", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        textColor: "beige",
        opacity: 1,
      });
    } else if (
      error.message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      let toast = Toast.show("Password should be at least 6 characters long", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        textColor: "beige",
        opacity: 1,
      });
    } else if (
      error.message === "Firebase: Error (auth/network-request-failed)."
    ) {
      let toast = Toast.show("Password should be at least 6 characters long", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        textColor: "beige",
        opacity: 1,
      });
    } else if (
      error.message === "Firebase: Error (auth/email-already-in-use)."
    ) {
      let toast = Toast.show("An account under that name already exists", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        textColor: "beige",
        opacity: 1,
      });
    } else {
      let toast = Toast.show(error.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        textColor: "beige",
        opacity: 1,
      });
    }
  }
};

export const handleSignIn = async (auth, email, password, setUser) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response?.user?.email) {
      let toast = Toast.show("Sign-in successful!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "green",
        textColor: "beige",
        opacity: 1,
      });
    }

    const userCredentials = JSON.stringify({
      accessToken: response?.user?.accessToken,
    });
    await AsyncStorage.setItem("userCredentials", userCredentials);
    setUser(response.user);
  } catch (error) {
    console.log("Sign-in error:", error.message);

    let toast = Toast.show("Sign-in failed. Check your credentials.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      backgroundColor: "red",
      textColor: "beige",
      opacity: 1,
    });
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("userCredentials");
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
