import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";

const MyButton = ({ title, onPress, warning, width }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonWrapper, warning && styles.warningButton]}
    >
      <Text style={[styles.textStyle, warning && styles.warningText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: myColors.beige,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: myColors.black,
    padding: 10,
    width: "80%",
    alignSelf: "center",
  },
  warningButton: {
    backgroundColor: myColors.pink,
  },
  warningText: { color: myColors.beige },
  textStyle: {
    fontFamily: regFont.fontFamily,
    color: myColors.black,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
  },
});
