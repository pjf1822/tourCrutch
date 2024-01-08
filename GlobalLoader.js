import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { regFont } from "./theme";

const GlobalLoader = () => {
  return (
    <ImageBackground
      source={require("./assets/DJ.jpg")}
      style={styles.background}
    ></ImageBackground>
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
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
