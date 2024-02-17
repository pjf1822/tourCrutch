import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyComponents/MyButton";
import MyTextInput from "../components/MyComponents/MyTextInput";
import { handleSignIn } from "../functionUtils/authFunctionUtils";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            placeholder={"Email"}
            onChangeText={(value) => {
              setEmail(value);
            }}
            value={email}
            secureTextEntry={false}
            width={"80%"}
          />
          <View style={styles.spacer}></View>

          <MyTextInput
            placeholder={"Password"}
            onChangeText={(value) => {
              setPassword(value);
            }}
            value={password}
            secureTextEntry={true}
            width={"80%"}
          />
          <View style={styles.spacer}></View>

          <MyButton
            title="Log In"
            onPress={() => handleSignIn(email, password)}
            warning={false}
            width={"80%"}
          />
        </View>

        <View style={{ paddingBottom: windowHeight / 13 }}>
          <MyButton
            title="Go to sign up page"
            onPress={() => navigation.navigate("Signup")}
            warning={false}
            width={"80%"}
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
