import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_STORAGE } from "./firebaseConfig";

export const pickImage = async (ImagePicker, user, setUser) => {
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
        await uploadUserProfilePic(result.assets[0].uri, user, setUser);
      } else {
        showToast("File size too big", false, "top");
        console.error("Selected file exceeds the maximum allowed size.");
      }
    }
  } catch (error) {
    console.error("Error picking an image:", error);
  }
};

export const uploadUserProfilePic = async (imageUri, user, setUser) => {
  const uploadCountString = await AsyncStorage.getItem("uploadCount");
  let uploadCount = uploadCountString ? parseInt(uploadCountString) : 0;

  if (uploadCount >= 40) {
    showToast("Upload limit exceeded.", false, "top");
    return;
  }

  if (!user || !user.getIdToken) {
    showToast("User information is missing or incomplete.", false, "top");
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

export const getUserProfilePic = async (userUid) => {
  try {
    const storageRef = ref(
      FIREBASE_STORAGE,
      `user-profiles/${userUid}/profile-pic.jpg`
    );

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    const downloadURL = "noPic";
    return downloadURL;
  }
};
