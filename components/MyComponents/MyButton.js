import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { myColors, regFont } from "../../theme";

const MyButton = ({ title, onPress, warning, width, iphoneFontSize }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonWrapper,
        warning && styles.warningButton,
        { width: width },
      ]}
    >
      <Text
        style={[
          styles.textStyle,
          warning && styles.warningText,
          (Platform.isPad && { fontSize: 24 }) ||
            (iphoneFontSize && { fontSize: iphoneFontSize }),
        ]}
      >
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
