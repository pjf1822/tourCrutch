import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { regFont } from "../theme";

const HomePageFlatListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.flatListItemWrapper}
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: "VenueDetail", params: { venueId: item._id } }],
        })
      }
    >
      <Text style={styles.itemStyle}>{item?.name}</Text>
      <Text style={styles.itemStyle}>{item?.address}</Text>
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
    justifyContent: "space-between",
    alignContent: "space-between",
    padding: 10,
  },
  itemStyle: {
    fontFamily: regFont.fontFamily,
    flex: 1,
  },
});
