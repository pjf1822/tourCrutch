import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { myColors, regFont, upperMargin } from "../theme";
import * as ImagePicker from "expo-image-picker";
import { showToast } from "../helpers";
import { useUser } from "../Contexts/UserContext";
import MyTextInput from "../components/MyTextInput";
import MyButton from "../components/MyButton";
import { pickImage } from "../storageFunctionUtils";
import { Overlay } from "react-native-elements";
import DeleteAccountModal from "../components/DeleteAccountModal";
const windowHeight = Dimensions.get("window").height;

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
    <ImageBackground
      source={require("../assets/DJ.jpg")}
      style={styles.background}
      blurRadius={1}
    >
      <View style={{ marginTop: windowHeight / upperMargin.margy }}>
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
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={styles.touchableWrapper}
              onPress={updatePassword}
            >
              <Text style={styles.label}>Update Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableWrapper}
              onPress={handleUpdateProfilePic}
            >
              <Text style={styles.label}>upload profile pic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableWrapper}
              onPress={toggleOverlay}
            >
              <Text style={styles.label}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  header: {
    color: myColors.sand,
    fontSize: 40,
    fontFamily: regFont.fontFamily,
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    color: myColors.sand,
    fontSize: 30,
    fontFamily: regFont.fontFamily,
    marginBottom: 8,
  },
  text: { fontSize: 25 },
  entryWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
    width: "100%",
  },
  deleteAccountText: {
    fontSize: 25,
    fontFamily: regFont.fontFamily,
  },
  touchableWrapper: {
    backgroundColor: myColors.blue,
    marginBottom: 25,
    padding: 12,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
  },

  overlay: {
    width: "93%",
    maxHeight: "93%",
    backgroundColor: myColors.sand,
    borderRadius: "10%",
  },
  userPhoto: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: myColors.blue,
    alignSelf: "center",
  },
});
