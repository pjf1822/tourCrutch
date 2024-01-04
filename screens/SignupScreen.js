import { View } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { handleSignUp } from "../authFunctionUtils";
import { TEST_THING } from "@env";
import { useUser } from "../Contexts/UserContext";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("df");

  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 100 }}>
      {/* <Text>{TEST_THING}</Text> */}
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
        title="signup"
        onPress={() =>
          handleSignUp(auth, email, password, displayName, setUser)
        }
      />

      <MyButton
        title="go to Login Page"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default SignupScreen;
