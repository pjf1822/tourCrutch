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
import { useNavigation } from "@react-navigation/native";
import {
  EmailAuthProvider,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  getAuth,
  deleteUser,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
const windowHeight = Dimensions.get("window").height;

const SettingsScreen = () => {
  const { user, setUser } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState(user?.photoURL);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const auth = getAuth();
  const navigation = useNavigation();
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

  const deleteAccount = async () => {
    toggleOverlay();
    try {
      const currentUser = auth.currentUser;
      showToast("Delete user!", true, "top");
      await deleteUser(currentUser);

      if (email !== "" && password !== "") {
        console.log("we are never");
        const credentials = EmailAuthProvider.credential(email, password);
        await signInWithEmailAndPassword(auth, email, password);
        await reauthenticateWithCredential(currentUser, credentials);
      }

      setUser(null);
    } catch (error) {
      if (error.message.includes("auth/requires-recent-login")) {
        showToast("Please type in your email and password", false, "top");
        setOpenCreds(true);
      } else if (error.message.includes("(auth/invalid-email)")) {
        showToast("Invalid Credentials", false, "top");
      }
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
            deleteAccount={deleteAccount}
          />
        </Overlay>
        <Text style={styles.header}>Account Details </Text>
        <Image
          source={
            // userProfilePic
            //   ? { uri: userProfilePic }
            //   : require("../assets/logito.png")
            require("../assets/logito.png")
          }
          style={styles.userPhoto}
        />

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
              <View style={{ height: 8 }}></View>
              <MyButton
                title={"Update Display Name"}
                onPress={updateUserDisplayName}
              />
            </View>
          </View>
          <View
            style={{
              height: "65%",
              display: "flex",
              justifyContent: "flex-start",
              // marginTop: 10,
              width: "100%",
            }}
          >
            <MyButton title="Update Password" onPress={updatePassword} />
            <View style={styles.spacer}></View>
            <MyButton
              title="Upload Profile Pic"
              onPress={handleUpdateProfilePic}
            />
            <View style={styles.spacer}></View>
            <MyButton title="Delete Account" onPress={toggleOverlay} />
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
    justifyContent: "center",
    width: "100%",
  },
  header: {
    color: myColors.beige,
    fontSize: 40,
    fontFamily: regFont.fontFamily,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: myColors.black,
    padding: 10,
    borderRadius: 50,
  },
  label: {
    color: myColors.sand,
    fontSize: 30,
    fontFamily: regFont.fontFamily,
    marginBottom: 8,
  },
  entryWrapper: {
    paddingTop: 15,
    paddingBottom: 5,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAccountText: {
    fontSize: 25,
    fontFamily: regFont.fontFamily,
  },

  overlay: {
    width: "93%",
    maxHeight: "93%",
    backgroundColor: myColors.beige,
    borderRadius: "10%",
  },
  userPhoto: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: myColors.red,
    alignSelf: "center",
  },
  spacer: {
    height: 7,
  },
});
