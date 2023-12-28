import { View, Text, TextInput } from "react-native";
import React from "react";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("hey");
  };
  return (
    <View>
      <TextInput
        value={username}
        onChangeText={() => {
          setUsername(value);
        }}
      />
      <TextInput
        value={password}
        onChangeText={() => {
          setPassword(value);
        }}
      />
      <Button title="signup" onPress={handleSubmit} />
    </View>
  );
};

export default SignupScreen;
