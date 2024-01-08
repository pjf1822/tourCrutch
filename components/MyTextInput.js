import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";

const MyTextInput = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.formTextInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor={myColors.shadow}
    />
  );
};

export default MyTextInput;
const styles = StyleSheet.create({
  formTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: myColors.darkBlue,
    padding: 10,
    marginTop: 2,
    marginBottom: 2,
    fontFamily: regFont.fontFamily,
    color: myColors.sand,
    backgroundColor: myColors.blue,
  },
});
