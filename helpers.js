import Fuse from "fuse.js";
import Toast from "react-native-root-toast";
import { FIREBASE_STORAGE } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const showToast = (toastMessage, success, position) => {
  let backgroundColor;

  if (success === true) {
    backgroundColor = "green";
  } else if (success === false) {
    backgroundColor = "red";
  } else {
    backgroundColor = "yellow";
  }
  let toast = Toast.show(toastMessage, {
    duration: Toast.durations.LONG,
    position: position === "top" ? Toast.positions.TOP : Toast.positions.BOTTOM,
    backgroundColor: backgroundColor,
    textColor: "white",
    opacity: 1,
    fontSize: 23,
  });
};

export const filterVenues = (venues, search) => {
  const fuse = new Fuse(venues, {
    keys: ["name", "address"],
    minMatchCharLength: 1,
    includeScore: true,
    threshold: 0.3,
  });

  return search ? fuse.search(search) : venues || [];
};

export const isValidUrl = (url) => {
  // Regular expression for a simple URL validation
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  return urlRegex.test(url);
};

export const pickImage = async (ImagePicker, uploadUserProfilePic) => {
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.canceled) {
      const fileSize = result.assets[0].fileSize;

      if (fileSize <= MAX_FILE_SIZE_BYTES) {
        await uploadUserProfilePic(result.assets[0].uri);
      } else {
        showToast("File size too big", false, "top");
        console.error("Selected file exceeds the maximum allowed size.");
      }
    }
  } catch (error) {
    console.error("Error picking an image:", error);
  }
};

export const uploadUserProfilePic = async (user, imageUri, setUser) => {
  const uploadCountString = await AsyncStorage.getItem("uploadCount");
  const uploadCount = uploadCountString ? parseInt(uploadCountString) : 0;

  if (uploadCount >= 10) {
    showToast("Upload limit exceeded.", false, "top");
    return;
  }
  try {
    const storageRef = ref(
      FIREBASE_STORAGE,
      `user-profiles/${user?.uid}/profile-pic.jpg`
    );

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const ready = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    setUser({ ...user, photoURL: downloadURL });

    await updateProfile(user, {
      photoURL: downloadURL,
    });
    await AsyncStorage.setItem("uploadCount", (uploadCount + 1).toString());

    showToast("Profile pic added!", true, "top");
  } catch (error) {
    showToast(error, false, "top");

    console.error(
      "Error uploading image:",
      error.code,
      error.message,
      error.serverResponse
    );
  }
};
