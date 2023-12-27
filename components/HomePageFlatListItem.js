import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const HomePageFlatListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.flatListItemWrapper}
      onPress={() =>
        navigation.navigate("VenueDetail", { id: item?._id, venue: item })
      }
    >
      <Text>{item?.name}</Text>
      <Text>{item?.address}</Text>
      <Text>{item?.link}</Text>
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
});
