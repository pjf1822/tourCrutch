import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyComponents/MyButton";
import MyTextInput from "../components/MyComponents/MyTextInput";
import { showToast } from "../helpers";
import * as ImagePicker from "expo-image-picker";
import { myColors, regFont } from "../theme";
import { handleSignUp } from "../functionUtils/authFunctionUtils";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState({
    assetId: null,
    base64: null,
    duration: null,
    exif: null,
    fileName: null,
    fileSize: null,
    height: null,
    type: null,
    uri: null,
    width: null,
  });

  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const isSignupDisabled = !email || !displayName || !password || !password2;

  const handleAddProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled == true) {
      return;
    }
    setProfilePic(result.assets[0]);
  };

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

      handleSignUp(email, password, displayName, profilePic);
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
      {!profilePic.uri ? (
        <Image
          style={{
            height: 150,
            width: 150,
            alignSelf: "center",
            marginTop: windowHeight / 10,
          }}
          source={require("../assets/logito.png")}
        />
      ) : (
        <Image
          source={{ uri: profilePic.uri }}
          style={[styles.userPhoto, { marginTop: windowHeight / 10 }]}
        />
      )}

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

          <MyTextInput
            placeholder="Type Your Password Again"
            onChangeText={(text) => setPassword2(text)}
            value={password2}
            secureTextEntry={true}
            width={"80%"}
          />
          <View style={styles.spacer}></View>

          <MyTextInput
            placeholder="Display Name"
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
            secureTextEntry={false}
            width={"80%"}
          />
          <View style={styles.spacer}></View>

          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={handleAddProfilePic}
          >
            <Text style={styles.textStyle}>Add Profile Pic? (Optional)</Text>
          </TouchableOpacity>

          <MyButton
            title="Sign Up"
            onPress={handleSignUpPress}
            warning={false}
            width={"80%"}
          />
        </View>
        <View style={{ paddingBottom: windowHeight / 13 }}>
          <MyButton
            title="Go to Login Page"
            onPress={() => navigation.navigate("Login")}
            warning={false}
            width={"80%"}
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
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: myColors.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: myColors.black,
    padding: 10,
    width: "80%",
    alignSelf: "center",
    marginBottom: 15,
  },
  textStyle: {
    fontFamily: regFont.fontFamily,
    color: myColors.red,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
  },
  userPhoto: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: myColors.red,
    alignSelf: "center",
  },
});
