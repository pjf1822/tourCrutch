import { View, Text, Button } from "react-native";
import React from "react";

const MyButton = ({ title, onPress }) => {
  return (
    <View>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default MyButton;
