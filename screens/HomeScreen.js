import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
  ScrollView,
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
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);

  const windowHeight = Dimensions.get("window").height;

  const { loading: userLoading, setLoading: setUserLoading } = useUser();
  const {
    data: fetchedVenues,
    isLoading,
    isError,
    refetch,
  } = useFetchVenues(search, page);

  useEffect(() => {
    if (!isLoading && !isError) {
      setVenues(fetchedVenues || []);
    }
  }, [fetchedVenues, isLoading, isError]);

  // use effect that reads route params when the page is opened
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.venueCreated || route?.params?.venueUpdated) {
        refetch();
        navigation.setParams({
          venueCreated: false,
          venueUpdated: false,
        });
      }
      if (route?.params?.venueDeleted) {
        const deletedVenueId = route?.params?.venueId;
        setVenues((prevVenues) =>
          prevVenues.filter((venue) => venue?._id !== deletedVenueId)
        );
        navigation.setParams({
          venueDeleted: false,
          venueId: null,
        });
      }
    }, [
      route.params?.venueCreated,
      route.params?.venueDeleted,
      route?.params?.venueUpdated,
    ])
  );

  return (
    <ImageBackground
      source={require("../assets/festival.jpg")}
      style={styles.homePageWrapper}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={{ marginTop: windowHeight / upperMargin.margy, flex: 1 }}>
        <SearchBar
          placeholder="Search A Venue"
          value={search}
          placeholderTextColor={myColors.beige}
          onChangeText={(text) => setSearch(text)} // Use the new handler
          style={{
            flex: 1,
            fontFamily: regFont.fontFamily,
            backgroundColor: "transparent",
            fontSize: Platform.OS === "ios" && Platform.isPad ? 28 : 18,
          }}
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {venues.map((venue, index) => (
              <View key={index}>
                <HomePageFlatListItem
                  item={venue?.item || venue}
                  navigation={navigation}
                />
                {index < venues.length - 1 && <FlatListSeparator />}
              </View>
            ))}
          </ScrollView>
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
