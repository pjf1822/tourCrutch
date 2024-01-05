import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { regFont } from "../theme";

const MyTextInput = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.formTextInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default MyTextInput;
const styles = StyleSheet.create({
  formTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    marginTop: 2,
    marginBottom: 2,
    fontFamily: regFont.fontFamily,
  },
});
