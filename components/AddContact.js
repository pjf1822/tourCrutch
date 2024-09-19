import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { myColors, regFont } from "../theme.js";

const AddContact = ({ toggleContactModal, updatedVenueData }) => {
  const [showDeleteInfo, setShowDeleteInfo] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDeleteInfo(false);
    }, 5000); // Adjust the delay as needed (in milliseconds)

    return () => clearTimeout(timer);
  }, []); // Run only once after component mount

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        onPress={toggleContactModal}
      >
        <Icon
          name="plus"
          style={{ color: "white", fontSize: 24, marginTop: 6 }}
        />
        {showDeleteInfo && updatedVenueData?.contactCards?.length > 0 && (
          <Text
            style={{
              paddingLeft: 10,
              fontFamily: regFont.fontFamily,
              fontSize: 16,
              color: myColors.pink,
            }}
          >
            To delete contact press & hold the contact card
          </Text>
        )}
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
