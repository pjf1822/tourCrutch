import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { myColors, regFont } from "../theme";

const HomePageFlatListItem = ({ item, navigation }) => {
  const navigateToVenueDetail = () => {
    navigation.navigate("VenueDetail", { venueId: item._id });
  };
  return (
    <TouchableOpacity
      style={styles.flatListItemWrapper}
      // onPress={() =>
      //   navigation.reset({
      //     index: 0,
      //     routes: [{ name: "VenueDetail", params: { venueId: item._id } }],
      //   })
      // }
      onPress={navigateToVenueDetail}
    >
      <Text style={styles.itemStyle}>{item?.name}</Text>
      <Text style={styles.itemStyle}>{item?.address}</Text>
      <Icon name="arrow-right" color={myColors.beige} />
    </TouchableOpacity>
  );
};

export default HomePageFlatListItem;

const styles = StyleSheet.create({
  flatListItemWrapper: {
    width: "98%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    padding: 10,
    backgroundColor: myColors.black,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 6,
  },
  itemStyle: {
    fontFamily: regFont.fontFamily,
    flex: 1,
    color: myColors.beige,
  },
});
