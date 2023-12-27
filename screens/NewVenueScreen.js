import { View, Text, TextInput, Button } from "react-native";
import { Formik, useFormikContext } from "formik";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { createVenue } from "../api";

const NewVenueScreen = () => {
  const handleSubmit = async (values) => {};
  // Handle form submission hereconst formData = new FormData();

  return (
    <View>
      <Formik
        initialValues={{
          name: "",
          address: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              placeholder="Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <TextInput
              placeholder="Address"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
            />

            {/* Submit button */}
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default NewVenueScreen;
