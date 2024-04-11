import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import React from "react";
import { myColors, regFont } from "../theme";

const ContactCard = ({ data, handleDeleteContactCard }) => {
  const handlePhonePress = () => {
    const phoneNumber = data?.phoneNumber?.replace(/\D/g, ""); // Remove non-numeric characters
    const phoneURL = `tel://${phoneNumber}`;
    Linking.openURL(phoneURL);
  };
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onLongPress={() => handleDeleteContactCard(data?._id)}
    >
      <View style={styles.half}>
        <Text style={styles.cardText}>{data?.name}</Text>
        <Text style={styles.cardText}>{data?.position}</Text>
      </View>
      <View style={[styles.half, { alignItems: "flex-end", marginLeft: 10 }]}>
        <Text style={styles.cardText}>{data?.email}</Text>
        <TouchableOpacity onPress={handlePhonePress}>
          <Text style={styles.cardText}>{data?.phoneNumber}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  cardWrapper: {
    borderColors: myColors.black,
    backgroundColor: myColors.beige,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    minWidth: 120,
  },

  half: {
    display: "flex",
    justifyContent: "center",
  },
  cardText: {
    fontFamily: regFont.fontFamily,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 17,
  },
});
