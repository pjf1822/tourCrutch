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

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("df");
  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

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
          />
          <View style={styles.spacer}></View>

          <MyButton
            title="Sign Up"
            onPress={() =>
              handleSignUp(auth, email, password, displayName, setUser)
            }
          />
        </View>
        <View style={{ paddingBottom: 40 }}>
          <MyButton
            title="go to Login Page"
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
