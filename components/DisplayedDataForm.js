import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";

const DisplayedDataForm = ({ venueData }) => {
  const handleLinkPress = () => {
    if (venueData?.link) {
      Linking.openURL(venueData?.link);
    }
  };

  return (
    <View style={styles.displayedDataWrapper}>
      <Text style={styles.displayedDataText}>{venueData?.name}</Text>
      <Text style={styles.displayedDataText}>{venueData?.address}</Text>
      {venueData?.link && (
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={[styles.displayedDataText, styles.linkText]}>
            {venueData.link}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DisplayedDataForm;

const styles = StyleSheet.create({
  displayedDataWrapper: { backgroundColor: myColors.beige, padding: 2 },
  displayedDataText: { fontFamily: regFont.fontFamily, padding: 2 },
});
