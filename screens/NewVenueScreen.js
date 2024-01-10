import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import React from "react";
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
    pdfs: [],
  };

  const createVenueStyles = {
    marginTop: windowHeight / upperMargin.margy,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <ImageBackground
      source={require("../assets/crowd.jpg")}
      style={[styles.pageWrapper]}
      imageStyle={{ opacity: 0.6 }}
    >
      <VenueForm
        windowHeight={windowHeight}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        buttonTitle="Submit"
        formStyles={createVenueStyles}
      />
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
