import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";

const Drawer = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="user/[id]" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "User",
          title: "overview",
        }}
      />
    </Drawer>
  );
};

export default Drawer;