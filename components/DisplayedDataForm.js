import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";

const DisplayedDataForm = ({ venueInfo }) => {
  const handleLinkPress = () => {
    if (venueInfo?.link) {
      Linking.openURL(venueInfo?.link);
    }
  };

  const formatAddress = (address) => {
    return address?.replace(/,+/g, ",").trim();
  };
  return (
    <View style={styles.displayedDataWrapper}>
      <Text style={styles.displayedDataText}>{venueInfo?.name}</Text>
      <Text style={styles.displayedDataText}>
        {formatAddress(venueInfo?.address)}
      </Text>
      {venueInfo?.link && (
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
    fontSize: 17,
    paddingLeft: 10,
  },
});
