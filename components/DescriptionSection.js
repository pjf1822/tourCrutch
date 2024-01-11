import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";
import { handleUpdateVenueInfo } from "../crudUtils/venue";

const DescriptionSection = ({
  venueInfo,
  setVenueInfo,
  updateVenueInfoMutation,
  venueId,
  user,
  venueData,
}) => {
  const handleDescriptionChange = (newDescription) => {
    setVenueInfo((prevVenueInfo) => ({
      ...prevVenueInfo,
      description: newDescription,
    }));
  };

  const handleDescriptionUpdate = async () => {
    const response = await handleUpdateVenueInfo(
      updateVenueInfoMutation,
      venueId,
      venueInfo?.createdByUID,
      user?.uid,
      venueData,
      venueInfo
    );
  };
  return (
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
          }}
        >
          Description
        </Text>
      </View>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={venueInfo.description}
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
  },

  localButtonStyle: {
    borderColors: myColors.black,
    backgroundColor: myColors.beige,
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
    fontSize: 17,
  },
});
