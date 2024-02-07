import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { handleSignUp } from "../authFunctionUtils";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";
import { showToast } from "../helpers";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");

  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const isSignupDisabled = !email || !displayName || !password || !password2;

  const handleSignUpPress = () => {
    try {
      if (isSignupDisabled) {
        showToast("You need to fill all the fields", false, "top");
        return;
      }
      if (password !== password2) {
        showToast("The passwords don't match", false, "top");
        return;
      }

      handleSignUp(email, password, displayName);
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };
  return (
    <ImageBackground
      source={require("../assets/gear.jpg")}
      style={styles.background}
      blurRadius={1}
    >
      <Image
        style={{
          height: 150,
          width: 150,
          alignSelf: "center",
          marginTop: windowHeight / 10,
        }}
        source={require("../assets/logito.png")}
      />
      <View style={[styles.pageWrapper, { paddingTop: windowHeight / 20 }]}>
        <View>
          <MyTextInput
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}
            placeholder={"Email"}
          />

          <View style={styles.spacer}></View>
          <MyTextInput
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <View style={styles.spacer}></View>

          <MyTextInput
            placeholder="Type Your Password Again"
            onChangeText={(text) => setPassword2(text)}
            secureTextEntry={true}
          />
          <View style={styles.spacer}></View>

          <MyTextInput
            placeholder="Display Name"
            onChangeText={(text) => setDisplayName(text)}
          />
          <View style={styles.spacer}></View>

          <MyButton title="Sign Up" onPress={handleSignUpPress} />
        </View>
        <View style={{ paddingBottom: windowHeight / 13 }}>
          <MyButton
            title="Go to Login Page"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  pageWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  spacer: {
    height: 10,
  },
});
