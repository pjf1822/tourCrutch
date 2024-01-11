import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { handleSignUp } from "../authFunctionUtils";
import { useUser } from "../Contexts/UserContext";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyTextInput";
import { showToast } from "../helpers";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");

  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const isSignupDisabled = !email || !displayName || !password || !password2;

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
            placeholder={"email"}
          />

          <View style={styles.spacer}></View>
          <MyTextInput
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            placeholder={"password"}
            secureTextEntry={true}
          />
          <View style={styles.spacer}></View>

          <MyTextInput
            // style={password2 !== "" ? styles.input : styles.inputEmpty}
            placeholder="Type Your Password Again"
            onChangeText={(text) => setPassword2(text)}
            secureTextEntry={true}
            // placeholderTextColor={colors.terraCotta}
          />
          <View style={styles.spacer}></View>

          <MyTextInput
            // style={displayName !== "" ? styles.input : styles.inputEmpty}
            placeholder="Display Name"
            // placeholderTextColor={colors.terraCotta}
            onChangeText={(text) => setDisplayName(text)}
          />
          <View style={styles.spacer}></View>

          <MyButton
            title="Sign Up"
            onPress={async () => {
              try {
                if (isSignupDisabled) {
                  showToast("You need to fill all the fields", false, "top");
                  return;
                }
                if (password !== password2) {
                  showToast("the passwords dont match", false, "top");
                  return;
                }

                await handleSignUp(auth, email, password, displayName, setUser);
              } catch (error) {
                // Handle errors here
                console.error("Sign Up Error:", error);
                // You can also show an error message to the user if needed
              }
            }}
          />
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
