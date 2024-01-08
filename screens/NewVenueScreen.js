import { View, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import React from "react";
import { useCreateVenue } from "../api";
import { createVenue } from "../crudUtils/venue";
import { useUser } from "../Contexts/UserContext";
import MyTextInput from "../components/MyTextInput";
import { myColors } from "../theme";
import MyButton from "../components/MyButton";

const NewVenueScreen = ({ navigation }) => {
  const createVenueMutation = useCreateVenue();
  const { user } = useUser();

  const handleSubmit = (values, { resetForm }) => {
    createVenue(values, user, createVenueMutation, navigation, resetForm);
  };
  return (
    <View style={styles.pageWrapper}>
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
          <View>
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
    </View>
  );
};

export default NewVenueScreen;

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: myColors.sand,
  },
});
