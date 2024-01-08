import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { regFont } from "../theme";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "../helpers";
import { useUser } from "../Contexts/UserContext";
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";
import { pickImage } from "../storageFunctionUtils";
import { Overlay } from "react-native-elements";
import DeleteAccountModal from "../components/DeleteAccountModal";

const SettingsScreen = () => {
  const { user, setUser } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState(user?.photoURL);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (user && user?.displayName) {
      setDisplayName(user?.displayName);
    }
  }, [user]);

  const updateUserDisplayName = async () => {
    try {
      if (user) {
        await updateProfile(user, {
          displayName: displayName,
        });

        setUser({ ...user, displayName: displayName });
        showToast("Display name updated!", true, "top");
      } else {
        showToast("User info not available!", false, "top");
      }
    } catch (error) {
      showToast("Error updating", false, "top");
      console.error("Error updating display name:", error.message);
    }
  };

  const updatePassword = async () => {
    try {
      await sendPasswordResetEmail(user?.auth, user?.email);
      showToast("Email sent to update password!", true, "top");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateProfilePic = async () => {
    try {
      await pickImage(ImagePicker, user, setUser);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <DeleteAccountModal
          user={user}
          setUser={setUser}
          toggleOverlay={toggleOverlay}
        />
      </Overlay>
      <Text style={styles.header}>Account Details </Text>
      <Image source={{ uri: userProfilePic }} style={styles.userPhoto} />

      <View style={styles.formWrapper}>
        <View style={styles.entryWrapper}>
          <Text style={styles.label}>Email Account</Text>
          <Text style={styles.text}>{user?.email}</Text>
        </View>
        <View style={styles.entryWrapper}>
          <View style={styles.entryWrapper}>
            <Text style={styles.label}>Display Name</Text>
            <MyTextInput
              placeholder="displayName"
              onChangeText={(thing) => setDisplayName(thing)}
              value={displayName}
            />
            <Text>{user.displayName && user.displayName}</Text>
            <MyButton
              title={"update displayname"}
              onPress={updateUserDisplayName}
            />
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
          <TouchableOpacity onPress={handleUpdateProfilePic}>
            <Text>upload profile pic</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOverlay}>
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
    height: 80,
    width: 80,
  },
});
