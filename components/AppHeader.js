import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AppHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="md-home-sharp" size={24} color="black" />
      </TouchableOpacity>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    displa: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
  },
});

export default AppHeader;
