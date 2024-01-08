import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import React from "react";
import { useCreateVenue } from "../api";
import { createVenue } from "../crudUtils/venue";
import { useUser } from "../Contexts/UserContext";
import MyTextInput from "../components/MyTextInput";
import { myColors, upperMargin } from "../theme";
import MyButton from "../components/MyButton";

const NewVenueScreen = ({ navigation }) => {
  const createVenueMutation = useCreateVenue();
  const { user } = useUser();
  const windowHeight = Dimensions.get("window").height;

  const handleSubmit = (values, { resetForm }) => {
    createVenue(values, user, createVenueMutation, navigation, resetForm);
  };
  return (
    <ImageBackground
      source={require("../assets/crowd.jpg")}
      style={[styles.pageWrapper]}
      imageStyle={{ opacity: 0.6 }}
    >
      <Formik
        initialValues={{
          name: "",
          address: "",
          link: "",
          pdfs: [],
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, navigation }) => (
          <View style={{ marginTop: windowHeight / upperMargin.margy }}>
            <MyTextInput
              placeholder="Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <MyTextInput
              placeholder="Address"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
            />
            <MyTextInput
              placeholder="Venue Link"
              onChangeText={handleChange("link")}
              onBlur={handleBlur("link")}
              value={values.link}
            />

            <MyButton title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
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
