import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HomePageFlatListItem from "../components/HomePageFlatListItem";
import FlatListSeparator from "../components/FlatListSeparator";
import { SearchBar } from "react-native-elements";
import { useFetchVenues } from "../api";
import MyButton from "../components/MyComponents/MyButton";
import { useFocusEffect } from "@react-navigation/native";
import { filterVenues } from "../helpers";
import { myColors, regFont, upperMargin } from "../theme";
import { useUser } from "../Contexts/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation, route }) => {
  console.log(route.params, "the route params");
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);
  const windowHeight = Dimensions.get("window").height;

  const { loading: userLoading, setLoading: setUserLoading } = useUser();
  const { data: fetchedVenues, isLoading, isError, refetch } = useFetchVenues();

  useEffect(() => {
    if (!isLoading && !isError) {
      setVenues(fetchedVenues || []);
    }
  }, [fetchedVenues, isLoading, isError]);

  // For the search bar
  const result = filterVenues(venues, search);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.venueCreated || route?.params?.venueUpdated) {
        refetch();
      }
      if (route.params?.venueDeleted) {
        const deletedVenueId = route?.params?.venueId;
        setVenues((prevVenues) =>
          prevVenues.filter((venue) => venue?._id !== deletedVenueId)
        );
      }
    }, [route.params?.venueCreated, route.params?.venueDeleted, refetch])
  );

  useEffect(() => {
    if (route.params?.venueCreated || route.params?.venueDeleted) {
      navigation.setParams({
        venueCreated: false,
        venueDeleted: false,
        venueUpdated: false,
        venueId: null,
      });
    }
  }, [route?.params?.venueCreated, route?.params?.venueDeleted, navigation]);

  return (
    <ImageBackground
      source={require("../assets/festival.jpg")}
      style={styles.homePageWrapper}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={{ marginTop: windowHeight / upperMargin.margy, flex: 1 }}>
        <SearchBar
          placeholder="search a venue"
          value={search}
          placeholderTextColor={myColors.beige}
          onChangeText={(search) => setSearch(search)}
          style={{
            flex: 1,
            fontFamily: regFont.fontFamily,
            backgroundColor: "transparent",
            fontSize: Platform.OS === "ios" && Platform.isPad ? 28 : 18,
          }}
          // onClear={() => setSearch("")}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomWidth: "0px",
            borderTopWidth: "0px",
            paddingBottom: Platform.OS === "ios" && Platform.isPad ? 10 : 0,
          }}
          inputContainerStyle={{
            backgroundColor: "transparent",
          }}
          inputStyle={{ color: myColors.beige }}
          clearIcon={
            <Icon
              name="times"
              size={20}
              color={myColors.beige}
              onPress={() => setSearch("")}
            />
          }
          searchIcon={<Icon name="search" size={17} color={myColors.beige} />}
        />
        {!userLoading && !isLoading && (
          <FlatList
            contentContainerStyle={{
              flex: 1,
            }}
            data={result.map((fuseResult) => fuseResult?.item || fuseResult)}
            renderItem={({ item, index }) => (
              <HomePageFlatListItem item={item} navigation={navigation} />
            )}
            ItemSeparatorComponent={<FlatListSeparator />}
            keyExtractor={(item, index) => item?._id || index.toString()}
          />
        )}
        <View
          style={{
            paddingBottom: windowHeight / 13,
          }}
        >
          <MyButton
            title="Create New Venue"
            onPress={() => navigation.navigate("NewVenue")}
            warning={false}
            width={"80%"}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  homePageWrapper: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "black",
    justifyContent: "space-between",
  },
});
