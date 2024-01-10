import { View, Text, TextInput } from "react-native";
import React from "react";
import { stateOptions } from "../helpers";
import MyButton from "../components/MyButton";
import { myColors, regFont, upperMargin } from "../theme";
import { createVenue } from "../crudUtils/venue";
import MyTextInput from "../components/MyTextInput";
import { useCreateVenue } from "../api";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

const VenueForm = ({ user, windowHeight, navigation }) => {
  const handleSubmit = (values, { resetForm }) => {
    createVenue(values, user, createVenueMutation, navigation, resetForm);
  };
  const createVenueMutation = useCreateVenue();

  return (
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
              //   style={styles.picker}
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
  );
};

export default VenueForm;
