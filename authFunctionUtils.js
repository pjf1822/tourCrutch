import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const handleSignUp = (email, password, displayName) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (displayName) {
        updateProfile(user, { displayName })
          .then(() => {
            // Profile updated successfully
          })
          .catch((profileError) => {
            console.error("Error updating profile:", profileError);
          });
      }

      handleSignIn(email, password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    });
};
export const handleSignIn = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
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

export const handleDeleteUser = (email, password) => {
  const user = auth.currentUser;

  if (user) {
    const credentials = EmailAuthProvider.credential(email, password);

    console.log(credentials, "show me the creds");

    reauthenticateWithCredential(user, credentials)
      .then(() => {
        console.log("then were ready to do the thing");
        return deleteUser(user);
      })
      .then(() => {
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error.code, error.message);
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
        console.log("Display name updated successfully");
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
