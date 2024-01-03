import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { handleSignIn } from "../authFunctionUtils";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../Contexts/UserContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 100 }}>
      <Text>LoginScreen</Text>
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
        title="singin"
        onPress={() => handleSignIn(auth, email, password, setUser)}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Go to sign up Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
