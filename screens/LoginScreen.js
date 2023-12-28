import { View, Text } from "react-native";
import React, { useState } from "react";
import Toast from "react-native-root-toast";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response?.user?.email) {
        let toast = Toast.show("Sign-in successful!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "green",
          textColor: "beige",
          opacity: 1,
        });
      }

      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
      });
      await AsyncStorage.setItem("userCredentials", userCredentials);
      setUser(response.user);
    } catch (error) {
      console.log("Sign-in error:", error.message);

      let toast = Toast.show("Sign-in failed. Check your credentials.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        textColor: "beige",
        opacity: 1,
      });
    }
  };

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button onPress={signIn}></Button>
    </View>
  );
};

export default LoginScreen;
