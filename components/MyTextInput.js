import { View, Text, TextInput } from "react-native";
import React from "react";

const MyTextInput = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default MyTextInput;
