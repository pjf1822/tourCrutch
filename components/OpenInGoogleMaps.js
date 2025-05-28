import { View, Text, Linking } from "react-native";
import React from "react";
import MyButton from "./MyComponents/MyButton";

const OpenInGoogleMaps = ({ updatedVenueDataCoordinates }) => {
  const handleNavigateWithGoogleMaps = () => {
    const latitude = updatedVenueDataCoordinates.latitude;
    const longitude = updatedVenueDataCoordinates.longitude;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&dir_action=navigate`;

    Linking.openURL(url);
  };
  return (
    <View>
      <MyButton
        width={"83%"}
        title="Open in Google Maps"
        onPress={handleNavigateWithGoogleMaps}
        iphoneFontSize={19}
      />
    </View>
  );
};

export default OpenInGoogleMaps;
