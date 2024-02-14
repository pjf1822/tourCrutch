import { TextInput, StyleSheet, Platform } from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";

const MyTextInput2 = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={styles.formTextInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor={"gray"}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default MyTextInput2;
const styles = StyleSheet.create({
  formTextInput: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: myColors.white,
    padding: 10,
    marginBottom: 15,
    fontFamily: regFont.fontFamily,
    color: myColors.beige,
    backgroundColor: myColors.black,
    width: "80%",
    alignSelf: "center",
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
  },
});
