import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
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
  const windowHeight = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={require("../assets/DJ.jpg")}
      style={styles.background}
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
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <View style={styles.spacer}></View>

          <MyButton
            title="Log In"
            onPress={() => handleSignIn(auth, email, password, setUser)}
          />
        </View>

        <View style={{ paddingBottom: windowHeight / 13 }}>
          <MyButton
            title="Go to sign up page"
            onPress={() => navigation.navigate("Signup")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "black",
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
