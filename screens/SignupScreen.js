import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { handleSignUp } from "../authFunctionUtils";
import { TEST_THING } from "@env";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("df");

  console.log(TEST_THING && TEST_THING);
  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />
      <TextInput
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />
      <Button
        title="signup"
        onPress={() =>
          handleSignUp(auth, email, password, displayName, setUser)
        }
      />
      {TEST_THING && <Text>{TEST_THING}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Go to Login Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
