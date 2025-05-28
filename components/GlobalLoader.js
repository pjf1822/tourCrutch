import { StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { regFont } from "../theme";

const GlobalLoader = () => {
  return (
    <ImageBackground
      source={require("../assets/DJ.jpg")}
      style={styles.background}
    />
  );
};

export default GlobalLoader;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
