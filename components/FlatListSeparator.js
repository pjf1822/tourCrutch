import { View } from "react-native";
import React from "react";
import { myColors } from "../theme";

const FlatListSeparator = () => {
  return (
    <View style={{ backgroundColor: myColors.darkBlue, height: 2 }}></View>
  );
};

export default FlatListSeparator;
