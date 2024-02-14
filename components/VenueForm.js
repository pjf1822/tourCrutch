import { Platform, View } from "react-native";
import React from "react";
import { stateOptions } from "../helpers";
import MyButton from "../components/MyComponents/MyButton";
import { myColors, regFont, upperMargin } from "../theme";
import MyTextInput2 from "../components/MyComponents/MyTextInput2";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

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
        <View
          style={{
            ...formStyles,
          }}
        >
          <MyTextInput2
            placeholder="Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          <MyTextInput2
            placeholder="Street Name and Number"
            onChangeText={handleChange("streetNameNumber")}
            onBlur={handleBlur("streetNameNumber")}
            value={values.streetNameNumber}
          />
          <MyTextInput2
            placeholder="Apartment Number (Optional)"
            onChangeText={handleChange("apartmentNumber")}
            onBlur={handleBlur("apartmentNumber")}
            value={values.apartmentNumber}
          />
          <MyTextInput2
            placeholder="City"
            onChangeText={handleChange("city")}
            onBlur={handleBlur("city")}
            value={values.city}
          />
          <Picker
            selectedValue={values.state}
            onValueChange={(itemValue) => handleChange("state")(itemValue)}
            numberOfLines={1}
            itemStyle={{
              fontFamily: regFont.fontFamily,
              fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 18,
              width: "80%",
              backgroundColor: myColors.beige,
              alignSelf: "center",
              height: 60,
              borderRadius: 10,
              marginBottom: 15,
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
          <MyTextInput2
            placeholder="Zip Code"
            onChangeText={handleChange("zip")}
            onBlur={handleBlur("zip")}
            value={values.zip}
          />
          <MyTextInput2
            placeholder="Venue Link"
            onChangeText={handleChange("link")}
            onBlur={handleBlur("link")}
            value={values.link}
          />

          <View style={{ paddingBottom: windowHeight / 13 }}>
            <MyButton title={buttonTitle} onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default VenueForm;
