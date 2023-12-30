import { View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import React from "react";
import { useCreateVenue } from "../api";

const NewVenueScreen = ({ navigation }) => {
  const createVenueMutation = useCreateVenue();

  const handleSubmit = async (values) => {
    try {
      const result = await createVenueMutation.mutateAsync(values);
      navigation.navigate("Home", { venueCreated: true });
    } catch (error) {
      console.error("Failed to create venue:", error);
    }
  };

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
