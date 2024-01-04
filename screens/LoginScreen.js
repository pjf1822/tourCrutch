import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { handleSignIn } from "../authFunctionUtils";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../Contexts/UserContext";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 100 }}>
      <Text>LoginScreen</Text>
      <MyTextInput
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
        placeholder={"email"}
      />
      <MyTextInput
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
        placeholder={"password"}
      />
      <MyButton
        title="singin"
        onPress={() => handleSignIn(auth, email, password, setUser)}
      />

      <MyButton
        title="Go to sign up page"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

export default LoginScreen;
