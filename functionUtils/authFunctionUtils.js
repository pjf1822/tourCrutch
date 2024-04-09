import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { showToast } from "../helpers";
import { uploadUserProfilePic } from "./storageFunctionUtils";

export const handleSignUp = (email, password, displayName, profilePic) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const profileData = {
        displayName: displayName,
      };

      if (profilePic.uri) {
        uploadUserProfilePic(profilePic.uri, user)
          .then((imageURL) => {
            profileData.photoURL = imageURL;
            updateProfile(user, profileData)
              .then(() => {
                handleSignIn(email, password, true);
                showToast("Account created!", true, "top");
              })
              .catch((profileError) => {
                console.error("Error updating profile:", profileError);
                showToast(
                  "An error occurred during profile update",
                  false,
                  "top"
                );
              });
          })
          .catch((uploadError) => {
            console.error("Error uploading profile picture:", uploadError);
            showToast(
              "An error occurred during profile picture upload",
              false,
              "top"
            );
          });
      } else {
        updateProfile(user, profileData)
          .then(() => {
            handleSignIn(email, password, true);
            showToast("Account created!", true, "top");
          })
          .catch((profileError) => {
            console.error("Error updating profile:", profileError);
            showToast("An error occurred during profile update", false, "top");
          });
      }
    })
    .catch((error) => {
      console.log(error.message, "what is this");

      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        showToast("This email already has an account", false, "top");
      }
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        showToast("Invalid email", false, "top");
      }
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        showToast("Password should be at least six characters", false, "top");
      }
    });
};

export const handleSignIn = (email, password, accountCreated) => {
  if (!email || !password) {
    showToast("Please fill in all fields", false, "top");
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      !accountCreated && showToast("User signed in!", true, "top");
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        showToast("Invalid email or password", false, "top");
      }
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        showToast("Wrong password", false, "top");
      }
    });
};

export const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.error("Error signing out:", error.code, error.message);
    });
};

export const handleDeleteUser = (email, password, toggleOverlay) => {
  const user = auth.currentUser;

  if (user) {
    const credentials = EmailAuthProvider.credential(email, password);

    reauthenticateWithCredential(user, credentials)
      .then(() => {
        showToast("User Deleted", true, "top");
        toggleOverlay();
        return deleteUser(user);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          showToast("Invalid email or password", false, "top");
        }
      });
  } else {
    console.error("No user is currently signed in");
  }
};

export const updateDisplayName = (displayName, toggleProfileUpdated) => {
  const user = auth.currentUser;

  if (user) {
    updateProfile(user, { displayName })
      .then(() => {
        toggleProfileUpdated();
        showToast("Display name updated!", true, "top");
      })

      .catch((error) => {
        console.error(
          "Error updating display name:",
          error.code,
          error.message
        );
      });
  } else {
    console.error("No user is currently signed in");
  }
};
