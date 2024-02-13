import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Contexts/UserContext";
import VenueForm from "../components/VenueForm";
import { createVenue } from "../crudUtils/venue";
import { useCreateVenue } from "../api";
import { upperMargin } from "../theme";

const NewVenueScreen = ({ navigation }) => {
  const { user } = useUser();
  const windowHeight = Dimensions.get("window").height;

  const createVenueMutation = useCreateVenue();

  const handleSubmit = (values, { resetForm }) => {
    createVenue(values, user, createVenueMutation, navigation, resetForm);
  };

  const initialValues = {
    name: "",
    streetNameNumber: "",
    apartmentNumber: "",
    city: "",
    state: "",
    zip: "",
    link: "",
    description: "",
    pdfs: [],
    contactCards: [],
  };

  const createVenueStyles = {
    // marginTop: windowHeight / upperMargin.margy,
    flex: 1,
    display: "flex",
    justifyContent: "center",
  };

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(20);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const modalPosition = Platform.OS === "ios" ? { bottom: keyboardHeight } : {};
  return (
    <ImageBackground
      source={require("../assets/gear.jpg")}
      style={[styles.pageWrapper]}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={[modalPosition, { flex: 1 }]}>
        <Image
          style={{
            height: 150,
            width: 150,
            alignSelf: "center",
            marginTop: windowHeight / 10,
          }}
          source={require("../assets/logito.png")}
        />
        <VenueForm
          windowHeight={windowHeight}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          buttonTitle="Submit"
          formStyles={createVenueStyles}
        />
      </View>
    </ImageBackground>
  );
};

export default NewVenueScreen;

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "black",
  },
});
