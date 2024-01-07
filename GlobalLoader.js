import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { regFont } from "./theme";

const GlobalLoader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/logo.png")} />
      <Text style={styles.loadingFontStyle}>LOading Babayyyy</Text>
    </View>
  );
};

export default GlobalLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
  loadingFontStyle: {
    fontFamily: regFont.fontFamily,
    fontSize: 40,
  },
});
