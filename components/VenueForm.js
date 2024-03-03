import { Platform, View, Text } from "react-native";
import React from "react";
import MyButton from "../components/MyComponents/MyButton";
import { myColors, regFont, upperMargin } from "../theme";
import MyTextInput2 from "../components/MyComponents/MyTextInput2";
import { Formik } from "formik";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_AUTOCOMPLETE_KEY } from "@env";

const VenueForm = ({
  windowHeight,
  handleSubmit,
  initialValues,
  buttonTitle,
  formStyles,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <MyTextInput2
            placeholder={initialValues.name || "Name"}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />

          <MyTextInput2
            placeholder={initialValues.link || "Link"}
            onChangeText={handleChange("link")}
            onBlur={handleBlur("link")}
            value={values.link}
          />
          <GooglePlacesAutocomplete
            styles={{
              textInputContainer: {
                borderWidth: 2,
                borderRadius: 6,
                borderColor: myColors.white,
                padding: 10,
                marginBottom: 15,
                fontFamily: regFont.fontFamily,
                backgroundColor: myColors.black,
                color: myColors.beige,
                width: "80%",
                alignSelf: "center",
                fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
                placeholderColor: "green",
              },
              description: {
                color: myColors.beige,
              },
              predefinedPlacesDescription: {
                color: myColors.beige,
              },
              poweredContainer: {
                paddingBottom: 7,
                paddingTop: 7,
              },

              textInput: {
                color: myColors.beige,
              },
              separator: {
                height: 0.9,
              },
              row: {
                padding: 13,
                height: 44,
                flexDirection: "row",
                backgroundColor: myColors.black,
                color: myColors.beige,
              },
            }}
            nearbyPlacesAPI="none"
            onPress={(data, details = null) => {
              handleChange("address")(data.description);
            }}
            currentLocation={false}
            currentLocationLabel=""
            onFail={(error) => {
              console.error("Google Places Autocomplete failed:", error);
            }}
            suppressDefaultStyles={true}
            query={{
              key: GOOGLE_AUTOCOMPLETE_KEY,
              language: "en",
            }}
            debounce={100}
            enableHighAccuracyLocation={false}
            enablePoweredByContainer={false}
            minLength={2}
            placeholder={initialValues.address || "Address"}
            textInputProps={{
              placeholderTextColor: "gray",
              fontFamily: regFont.fontFamily,
              fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
            }}
          />

          <View
            style={{
              paddingBottom: buttonTitle === "Update" ? 8 : windowHeight / 13,
            }}
          >
            <MyButton
              title={buttonTitle}
              onPress={handleSubmit}
              warning={false}
              width={"80%"}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default VenueForm;
