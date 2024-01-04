import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { regFont } from "../theme";

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
    backgroundColor: "green",
    borderTopWidth: 1,
    borderColor: "black",
  },
  textStyle: {
    fontFamily: regFont.fontFamily,
  },
});
