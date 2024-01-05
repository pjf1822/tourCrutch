import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { showToast } from "./helpers.js";
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
    const userWithDisplayName = { ...response.user, displayName };

    await updateProfile(response.user, {
      displayName: displayName,
    });
    setUser(userWithDisplayName);

    const userCredentials = JSON.stringify({
      accessToken: response?.user?.accessToken,
    });
    showToast("Youve signed up!", true, "top");
    await AsyncStorage.setItem("userCredentials", userCredentials);
  } catch (error) {
    if (error.message === "Firebase: Error (auth/invalid-email).") {
      showToast("Invalid Email!", false, "top");
    } else if (
      error.message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      showToast("Password should be at least 6 characters long", false, "top");
    } else if (
      error.message === "Firebase: Error (auth/network-request-failed)."
    ) {
      showToast("The server is still spinning sorrryy", false, "top");
    } else if (
      error.message === "Firebase: Error (auth/email-already-in-use)."
    ) {
      showToast("An account under that name already exists", false, "top");
    } else {
      showToast(error.message, false, "top");
    }
  }
};

export const handleSignIn = async (auth, email, password, setUser) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response?.user?.email) {
      showToast("Signin successful!", true, "top");
    }

    const userCredentials = JSON.stringify({
      accessToken: response?.user?.accessToken,
    });
    await AsyncStorage.setItem("userCredentials", userCredentials);
    setUser(response.user);
  } catch (error) {
    showToast("Sign-in failed. Check your credentials.", false, "top");
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
