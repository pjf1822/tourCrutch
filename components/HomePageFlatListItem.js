import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { myColors, regFont } from "../theme";

const HomePageFlatListItem = ({ item, navigation }) => {
  const navigateToVenueDetail = () => {
    navigation.navigate("VenueDetail", { venueId: item.id });
  };

  return (
    <TouchableOpacity
      style={styles.flatListItemWrapper}
      onPress={navigateToVenueDetail}
    >
      <View>
        <Text style={styles.itemStyle}>{item?.name}</Text>
        <Text style={styles.displayedDataText}>{item?.address}</Text>
      </View>

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
    color: myColors.black,

    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 18,
  },
  displayedDataText: {
    fontFamily: regFont.fontFamily,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 13,
    paddingRight: Platform.OS === "ios" && Platform.isPad ? 20 : 0,
    color: myColors.black,
  },
});
