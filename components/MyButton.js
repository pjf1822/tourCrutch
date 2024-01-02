import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { regFont } from "../theme";

const MyButton = ({ title, onPress }) => {
  return (
    <View>
      <Button title={title} onPress={onPress} style={styles.buttonStyle} />
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  buttonStyle: {
    fontFamily: regFont.fontFamily,
  },
});
