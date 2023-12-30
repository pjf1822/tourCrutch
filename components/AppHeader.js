import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AppHeader = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="md-home-sharp" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;
