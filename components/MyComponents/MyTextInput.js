import { TextInput, StyleSheet, Platform } from "react-native";
import React from "react";
import { myColors, regFont } from "../../theme";

const MyTextInput = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  width,
}) => {
  return (
    <TextInput
      style={[styles.formTextInput, { width: width }]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor={"gray"}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default MyTextInput;
const styles = StyleSheet.create({
  formTextInput: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: myColors.white,
    padding: Platform.OS === "ios" && Platform.isPad ? 14 : 10,
    marginTop: 2,
    marginBottom: 2,
    fontFamily: regFont.fontFamily,
    color: myColors.beige,
    backgroundColor: myColors.black,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
  },
});
