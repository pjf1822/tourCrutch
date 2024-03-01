import { Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { myColors, regFont } from "../theme";

const HomePageFlatListItem = ({ item, navigation }) => {
  const navigateToVenueDetail = () => {
    navigation.navigate("VenueDetail", { venueId: item._id });
  };

  // const formatAddress = (address) => {
  //   return address.replace(/,+/g, ",").trim();
  // };

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
      <Text style={styles.displayedDataText}>
        {/* {formatAddress(item?.address.substring(0, 30))} */}
        {item?.address}
      </Text>
      <Icon name="arrow-right" color={myColors.black} />
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
    alignItems: "center",
    backgroundColor: myColors.beige,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 6,
    padding: Platform.OS === "ios" && Platform.isPad ? 15 : 10,
  },
  itemStyle: {
    fontFamily: regFont.fontFamily,
    flex: 1,
    color: myColors.black,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 15,
  },
  displayedDataText: {
    fontFamily: regFont.fontFamily,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 15,
    paddingRight: Platform.OS === "ios" && Platform.isPad ? 20 : 0,
  },
});
