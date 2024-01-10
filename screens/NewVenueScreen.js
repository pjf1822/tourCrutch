import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import React, { useState } from "react";
import { useCreateVenue } from "../api";
import { createVenue } from "../crudUtils/venue";
import { useUser } from "../Contexts/UserContext";
import MyTextInput from "../components/MyTextInput";
import { myColors, regFont, upperMargin } from "../theme";
import MyButton from "../components/MyButton";
import { showToast, stateOptions } from "../helpers";
import * as DocumentPicker from "expo-document-picker";

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
          streetNameNumber: "",
          apartmentNumber: "",
          city: "",
          state: "",
          zip: "",
          link: "",
          pdfs: [],
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, navigation }) => (
          <View
            style={{
              marginTop: windowHeight / upperMargin.margy,
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <View>
              <MyTextInput
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <MyTextInput
                placeholder="Street Name and Number"
                onChangeText={handleChange("streetNameNumber")}
                onBlur={handleBlur("streetNameNumber")}
                value={values.streetNameNumber}
              />
              <MyTextInput
                placeholder="Apartment Number (Optional)"
                onChangeText={handleChange("apartmentNumber")}
                onBlur={handleBlur("apartmentNumber")}
                value={values.apartmentNumber}
              />
              <MyTextInput
                placeholder="City"
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
              <Picker
                selectedValue={values.state}
                style={styles.picker}
                onValueChange={(itemValue) => handleChange("state")(itemValue)}
                numberOfLines={1}
                itemStyle={{
                  fontFamily: regFont.fontFamily,
                  fontSize: 18,
                  width: "80%",
                  backgroundColor: myColors.beige,
                  alignSelf: "center",
                  height: 60,
                  borderRadius: 10,
                }}
              >
                {stateOptions?.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
              <MyTextInput
                placeholder="Zip Code"
                onChangeText={handleChange("zip")}
                onBlur={handleBlur("zip")}
                value={values.zip}
              />
              <MyTextInput
                placeholder="Venue Link"
                onChangeText={handleChange("link")}
                onBlur={handleBlur("link")}
                value={values.link}
              />
            </View>

            <View style={{ paddingBottom: windowHeight / 13 }}>
              <MyButton title="Submit" onPress={handleSubmit} />
            </View>
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
