import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { myColors } from "../theme";

const ContactCard = ({ data }) => {
  return (
    <View style={styles.cardWrapper}>
      <Text>{data.name}</Text>
      <Text>{data.title}</Text>
      <Text>{data.email}</Text>
      <Text>{data.number}</Text>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    maxWidth: "45%",
    alignItems: "center",
    borderColors: myColors.black,
    backgroundColor: myColors.beige,
    borderRadius: 10,
  },
});
