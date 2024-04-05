import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { myColors, regFont } from "../theme.js";

const AddContact = ({ toggleContactModal, updatedVenueData }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={toggleContactModal}>
        <Icon
          name="plus"
          style={{ color: "white", fontSize: 24, marginTop: 6 }}
        />
      </TouchableOpacity>
      {updatedVenueData?.contactCards?.length === 0 && (
        <TouchableOpacity
          onPress={toggleContactModal}
          style={{
            backgroundColor: myColors.beige,
            borderRadius: 10,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontFamily: regFont.fontFamily,
              padding: 10,
              fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 16,
            }}
          >
            Add Contact Cards
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddContact;
