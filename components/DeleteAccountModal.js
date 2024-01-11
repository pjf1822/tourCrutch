import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  EmailAuthProvider,
  signInWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  getAuth,
} from "firebase/auth";
import { showToast } from "../helpers";
import { myColors, regFont } from "../theme";

const DeleteAccountModal = ({ user, setUser, toggleOverlay, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openCreds, setOpenCreds] = useState(false);
  const auth = getAuth();

  const deleteAccount = async () => {
    try {
      const currentUser = auth.currentUser;
      if (email !== "" && password !== "") {
        const credentials = EmailAuthProvider.credential(email, password);
        await signInWithEmailAndPassword(auth, email, password);
        await reauthenticateWithCredential(currentUser, credentials);
      }
      await deleteUser(currentUser);
      setUser(null);
      toggleOverlay();
      navigation.navigate("Signup");
    } catch (error) {
      if (error.message.includes("auth/requires-recent-login")) {
        showToast("Please type in your email and password", false, "top");
        setOpenCreds(true);
      } else if (error.message.includes("(auth/invalid-email)")) {
        showToast("Invalid Credentials", false, "top");
      }
      {
      }
    }
  };

  return (
    <View>
      <TextInput
        disabled={openCreds}
        style={styles.inputStyle}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
        placeholderTextColor={openCreds ? myColors.beige : "gray"}
      />
      <TextInput
        disabled={openCreds}
        style={styles.inputStyle}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry={true}
        placeholderTextColor={openCreds ? myColors.beige : "gray"}
      />
      <Text
        style={{
          color: myColors.blue,
          width: "100%",
          fontFamily: regFont.fontFamily,
          textAlign: "center",
          fontSize: 17,
        }}
      >
        ARE YOU SURE ?
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            height: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={deleteAccount}
        >
          <Text
            style={{
              color: myColors.blue,
              width: "100%",
              fontFamily: regFont.fontFamily,
              fontSize: 17,
            }}
          >
            YES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={toggleOverlay}
        >
          <Text
            style={{
              color: myColors.darkBlue,
              width: "100%",
              fontFamily: regFont.fontFamily,
              fontSize: 17,
            }}
          >
            NO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    width: "100%",
    borderColor: myColors.blue,
    borderWidth: 2,
    marginTop: 2,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: myColors.beige,
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
  },
  disabledInputStyle: {
    height: 40,
    width: "100%",
    borderColor: myColors.black,
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: myColors.black,
    borderRadius: 10,
  },
});
