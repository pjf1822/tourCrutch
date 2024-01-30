import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_STORAGE } from "./firebaseConfig";
import { showToast } from "./helpers";
import { handleUpdateVenueInfo } from "./crudUtils/venue";

export const pickImage = async (user, setUser) => {
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const { uri, type, fileSize } = result.assets[0];

    if (result.canceled === true) {
      showToast("Error uploading image", false, "top");
      throw new Error("Upload canncelled.");
    }
    if (!type === "image") {
      showToast(error?.message, false, "top");
      throw new Error("Not an image");
    }
    if (fileSize > 10 * 1024 * 1024) {
      showToast(error?.message, false, "top");
      throw new Error("Image too large");
    }

    await uploadUserProfilePic(uri, user, setUser);
  } catch (error) {
    console.error("Error picking an image:", error);
  }
};

export const uploadUserProfilePic = async (imageUri, user, setUser) => {
  // const uploadCountString = await AsyncStorage.getItem("uploadCount");
  // let uploadCount = uploadCountString ? parseInt(uploadCountString) : 0;

  // if (uploadCount >= 40) {
  //   showToast("Upload limit exceeded.", false, "top");
  //   return;
  // }

  // if (!user || !user.getIdToken) {
  //   showToast("User information is missing or incomplete.", false, "top");
  //   return;
  // }

  try {
    const storageRef = ref(
      FIREBASE_STORAGE,
      `user-profiles/${user?.uid}/profile-pic.jpg`
    );
    const response = await fetch(imageUri);

    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(storageRef, blob);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);
            await updateProfile(user, { photoURL: downloadURL });
            showToast("Profile pic added!", true, "top");
            resolve();
          } catch (error) {
            showToast(error, false, "top");
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    showToast(error, false, "top");
    throw new Error("Error adding Profile Pic");
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

export const getVenuePDF = async (venueId, pdf) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `venue-info/${venueId}/${pdf}`);
    const fileRef = ref(FIREBASE_STORAGE, storageRef);
    const downloadURL = await getDownloadURL(fileRef);
    const localUri = `${FileSystem.cacheDirectory}${pdf}`;

    await FileSystem.downloadAsync(downloadURL, localUri);

    await Sharing.shareAsync(localUri, {
      mimeType: "application/pdf",
      dialogTitle: "Download PDF",
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadPDF = async (
  updateVenueInfoMutation,
  venueId,
  createdByUID,
  userUID,
  originalVenueData,
  updatedVenueData
) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    const { uri, mimeType, size, name } = result.assets[0];

    // error catching section
    if (result.canceled === true) {
      showToast("Error uploading PDF", false, "top");
      throw new Error("Upload canncelled.");
    }
    if (updatedVenueData?.pdfs?.includes(name)) {
      showToast("That file already exists", false, "top");
      throw new Error("File with the same name already exists.");
    }
    if (!mimeType === "application/pdf" || size > 10 * 1024 * 1024) {
      showToast(error?.message, false, "top");
      throw new Error("Document Picking Cancelled");
    }
    // if successful

    await uploadPDFToFirebase(uri, name, venueId);

    const updatedDataWithNewPDF = {
      ...updatedVenueData,
      pdfs: [...updatedVenueData.pdfs, name],
    };

    const updateVenuePDFs = await handleUpdateVenueInfo(
      updateVenueInfoMutation,
      venueId,
      createdByUID,
      userUID,
      originalVenueData,
      updatedDataWithNewPDF
    );

    return updateVenuePDFs;
  } catch (error) {
    showToast(error.message, false, "top");
    throw new Error("Error Picking a Document");
  }
};

export const uploadPDFToFirebase = async (imageUri, name, venueId) => {
  try {
    const storageRef = ref(FIREBASE_STORAGE, `venue-info/${venueId}/${name}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob, {
      customMetadata: {
        fileName: name,
      },
    });
    const uploadPromise = new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          resolve(uploadTask.snapshot);
        }
      );
    });

    await uploadPromise;
  } catch (error) {
    showToast("Document Upload Failed!", false, "top");
    throw new Error("Upload doc failed");
  }
};
