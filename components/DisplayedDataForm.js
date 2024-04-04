import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { myColors, regFont, upperMargin } from "../theme";

const DisplayedDataForm = ({ updatedVenueData, windowHeight }) => {
  const handleLinkPress = () => {
    if (updatedVenueData?.link) {
      Linking.openURL(updatedVenueData?.link);
    }
  };

  const formatAddress = (address) => {
    return address?.replace(/,+/g, ",").trim();
  };
  return (
    <View
      style={[
        styles.displayedDataWrapper,
        {
          marginTop: windowHeight / upperMargin.margy,
          marginLeft: 7,
          marginRight: 7,
        },
      ]}
    >
      <Text style={styles.displayedDataText}>{updatedVenueData?.name}</Text>
      <Text style={styles.displayedDataText}>
        {formatAddress(updatedVenueData?.address)}
      </Text>
      {updatedVenueData?.link && (
        <TouchableOpacity onPress={handleLinkPress}>
          <Text
            style={[
              styles.displayedDataText,
              styles.linkText,
              { color: myColors.pink },
            ]}
          >
            Venue Link
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DisplayedDataForm;

const styles = StyleSheet.create({
  displayedDataWrapper: {
    backgroundColor: myColors.beige,
    padding: 2,
    borderRadius: 10,
  },
  displayedDataText: {
    fontFamily: regFont.fontFamily,
    padding: 2,
    paddingLeft: 10,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 17,
  },
});
