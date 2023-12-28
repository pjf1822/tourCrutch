import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("df");

  const auth = FIREBASE_AUTH;
  const { setUser } = useUser();
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response, "the response");
      const userWithDisplayName = { ...response.user, displayName };

      await updateProfile(response.user, {
        displayName: displayName,
      });
      setUser(userWithDisplayName);

      const userCredentials = JSON.stringify({
        email: response?.user?.email,
        uid: response?.user?.uid,
        displayName: response?.user?.displayName,
      });

      await AsyncStorage.setItem("userCredentials", userCredentials);
    } catch (error) {
      console.log(error, "the error ");
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        let toast = Toast.show("Invalid Email", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "red",
          textColor: "beige",
          opacity: 1,
        });
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        let toast = Toast.show(
          "Password should be at least 6 characters long",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "red",
            textColor: "beige",
            opacity: 1,
          }
        );
      } else if (
        error.message === "Firebase: Error (auth/network-request-failed)."
      ) {
        let toast = Toast.show(
          "Password should be at least 6 characters long",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "red",
            textColor: "beige",
            opacity: 1,
          }
        );
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        let toast = Toast.show("An account under that name already exists", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "red",
          textColor: "beige",
          opacity: 1,
        });
      } else {
        let toast = Toast.show(error.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "red",
          textColor: "beige",
          opacity: 1,
        });
      }
    }
  };
  return (
    <View>
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
      <Button title="signup" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Go to Login Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
