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
import { myColors } from "../theme";

const DeleteAccountModal = ({ user, setUser, toggleOverlay }) => {
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
    } catch (error) {
      console.log(error.message, "we ended up in here");
      if (error.message.includes("auth/requires-recent-login")) {
        showToast("Please type in your email and password", false, "top");
        setOpenCreds(true);
      } else if (error.message.includes("(auth/invalid-email)")) {
        showToast("Invalid Credentials", false, "top");
        console.log(error.message, "or are we here");
      }
      {
        console.log(error.message, "are we here");
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
        placeholderTextColor={openCreds ? myColors.sand : "gray"}
      />
      <TextInput
        disabled={openCreds}
        style={styles.inputStyle}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry={true}
        placeholderTextColor={openCreds ? myColors.sand : "gray"}
      />
      <Text
        style={{
          color: myColors.blue,
          width: "100%",
          textAlign: "center",
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
    marginBottom: 12,
    paddingHorizontal: 8,
    // backgroundColor: colors.beige,
    borderRadius: 10,
  },
  disabledInputStyle: {
    height: 40,
    width: "100%",
    // borderColor: colors.blue,
    borderWidth: 2,
    marginBottom: 12,
    paddingHorizontal: 8,
    // backgroundColor: colors.beige,
    borderRadius: 10,
  },
});
