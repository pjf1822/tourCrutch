import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { myColors, regFont } from "../theme";
import { handleDeleteUser } from "../authFunctionUtils";
import { showToast } from "../helpers";

const DeleteAccountModal = ({ toggleOverlay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
        placeholderTextColor={myColors.black}
      />
      <TextInput
        style={styles.inputStyle}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry={true}
        placeholderTextColor={myColors.black}
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
          onPress={() => {
            if (email && password) {
              handleDeleteUser(email, password, toggleOverlay);
            } else {
              showToast("Fill in your user info", false, "top");
            }
          }}
        >
          <Text
            style={{
              color: !email || !password ? "grey" : myColors.blue,
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
