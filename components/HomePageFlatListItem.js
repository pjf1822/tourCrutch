import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { regFont } from "../theme";

const HomePageFlatListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.flatListItemWrapper}
      onPress={() =>
        navigation.navigate("VenueDetail", { id: item?._id, venue: item })
      }
    >
      <Text style={styles.itemStyle}>{item?.name}</Text>
      <Text style={styles.itemStyle}>{item?.address}</Text>
      <Text style={styles.itemStyle}>{item?.link}</Text>
      <Icon name="arrow-right" />
    </TouchableOpacity>
  );
};

export default HomePageFlatListItem;

const styles = StyleSheet.create({
  flatListItemWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "space-between",
    height: 100,
    backgroundColor: "green",
  },
  itemStyle: {
    fontFamily: regFont.fontFamily,
  },
});
