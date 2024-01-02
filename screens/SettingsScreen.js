import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useStorage, useUser } from "../UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sendPasswordResetEmail } from "firebase/auth";
import { regFont } from "../theme";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "../helpers";
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const SettingsScreen = () => {
  const { user, setUser } = useUser();
  const [displayName, setDisplayName] = useState("");

  const { uploadUserProfilePic } = useStorage();

  useEffect(() => {
    if (user && user?.displayName) {
      setDisplayName(user?.displayName);
    }
  }, [user]);
  const pickImage = async () => {
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

  const updatePassword = async () => {
    try {
      await sendPasswordResetEmail(user?.auth, user?.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Text style={styles.header}>Account Details </Text>
      <Image source={{ uri: user?.photoURL }} style={styles.userPhoto} />
      <View style={styles.formWrapper}>
        <View style={styles.entryWrapper}>
          <Text style={styles.label}>Email Account</Text>
          <Text style={styles.text}>{user?.email}</Text>
        </View>
        <View style={styles.entryWrapper}>
          <View style={styles.entryWrapper}>
            <Text style={styles.label}>Display Name</Text>
            <Text style={styles.text}>{user?.displayName}</Text>
          </View>
        </View>
        <View
          style={{
            height: "65%",
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={styles.touchableWrapper}
            onPress={updatePassword}
          >
            <Text>Update Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
          >
            <Text>upload profile pic</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  optionsPageWrapper: {
    // backgroundColor: colors.blue,
    height: "100%",
    display: "flex",
    paddingLeft: 20,
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header: {
    // color: colors.beige,
    fontSize: 40,
    fontFamily: regFont.fontFamily,
    marginBottom: 20,
  },
  label: {
    // color: colors.beige,
    fontSize: 30,
    fontFamily: regFont.fontFamily,
    marginBottom: 8,
  },
  text: { fontSize: 25 },
  entryWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  deleteAccountText: {
    fontSize: 25,
    fontFamily: regFont.fontFamily,
  },
  touchableWrapper: {
    // backgroundColor: colors.beige,
    marginBottom: 25,
    padding: 12,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
  },

  overlay: {
    width: "93%",
    maxHeight: "93%",
    // backgroundColor: colors.blue,
    borderRadius: "10%",
  },
  userPhoto: {
    height: 50,
    width: 50,
  },
});
