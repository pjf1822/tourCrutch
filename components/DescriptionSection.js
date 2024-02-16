import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";
import { handleUpdateVenueInfo } from "../crudUtils/venue";

const DescriptionSection = ({
  updatedVenueData,
  setUpdatedVenueData,
  updateVenueInfoMutation,
  venueId,
  user,
  initialVenueData,
}) => {
  const handleDescriptionChange = (newDescription) => {
    setUpdatedVenueData((prevVenueInfo) => ({
      ...prevVenueInfo,
      description: newDescription,
    }));
  };

  const handleDescriptionUpdate = async () => {
    const response = await handleUpdateVenueInfo(
      updateVenueInfoMutation,
      venueId,
      updatedVenueData?.createdByUID,
      user?.uid,
      initialVenueData,
      updatedVenueData
    );
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: myColors.black,
            padding: 8,
            borderRadius: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 5,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              fontFamily: regFont.fontFamily,
              color: myColors.white,
              fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 17,
            }}
          >
            Description
          </Text>
        </View>

        <TextInput
          style={styles.input}
          multiline
          numberOfLines={3}
          value={updatedVenueData.description}
          onChangeText={handleDescriptionChange}
          placeholder="Enter your text here"
        />
        <TouchableOpacity
          style={styles.localButtonStyle}
          onPress={handleDescriptionUpdate}
        >
          <Text style={styles.textStyle}>Update Description</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DescriptionSection;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  input: {
    borderWidth: 1,
    backgroundColor: myColors.beige,
    fontFamily: regFont.fontFamily,
    borderRadius: 8,
    padding: 8,
    minHeight: 100,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 17,
    position: "relative",
  },

  localButtonStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 100,
    borderColors: myColors.black,
    backgroundColor: myColors.beige,
    borderWidth: 3,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  textStyle: {
    fontFamily: regFont.fontFamily,
    color: myColors.black,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 17,
  },
});
