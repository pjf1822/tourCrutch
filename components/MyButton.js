import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: myColors.blue,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: myColors.sand,
    padding: 10,
  },
  textStyle: {
    fontFamily: regFont.fontFamily,
    color: myColors.shadow,
  },
});
