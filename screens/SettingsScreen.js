import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { myColors, regFont, upperMargin } from "../theme";
import { showToast } from "../helpers";
import { useUser } from "../Contexts/UserContext";
import MyTextInput from "../components/MyComponents/MyTextInput";
import MyButton from "../components/MyComponents/MyButton";
import { Overlay } from "react-native-elements";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { updateDisplayName } from "../functionUtils/authFunctionUtils";
import { pickImage } from "../functionUtils/storageFunctionUtils";
const windowHeight = Dimensions.get("window").height;

const SettingsScreen = () => {
  const { user, setUser, toggleProfileUpdated } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");

  const [visible, setVisible] = useState(false);

  console.log(user?.photoURL, "does this exist.step one");
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (user) {
      setDisplayName(user?.displayName);
      setUserProfilePic(user?.photoURL);
    }
  }, [user]);

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
      await pickImage(user, setUser, toggleProfileUpdated);
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
          <DeleteAccountModal toggleOverlay={toggleOverlay} />
        </Overlay>
        <Text style={styles.header}>Account Details </Text>
        {user?.photoURL ? (
          <Image source={{ uri: user?.photoURL }} style={styles.userPhoto} />
        ) : (
          <Image
            source={require("../assets/logito.png")}
            style={styles.userPhoto}
          />
        )}

        {/*  */}

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
                secureTextEntry={false}
                width={"80%"}
              />
              <View style={{ height: 8 }}></View>
              <MyButton
                title={"Update Display Name"}
                onPress={() =>
                  updateDisplayName(displayName, toggleProfileUpdated)
                }
                warning={false}
                width={"80%"}
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
            <MyButton
              title="Update Password"
              onPress={updatePassword}
              warning={false}
              width={"80%"}
            />
            <View style={styles.spacer}></View>
            <MyButton
              title="Upload Profile Pic"
              onPress={handleUpdateProfilePic}
              warning={false}
              width={"80%"}
            />
            <View style={styles.spacer}></View>
            <MyButton
              title="Delete Account"
              onPress={toggleOverlay}
              warning={false}
              width={"80%"}
            />
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

  text: {
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
  },
});
