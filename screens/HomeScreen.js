import { View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HomePageFlatListItem from "../components/HomePageFlatListItem";
import FlatListSeparator from "../components/FlatListSeparator";
import { SearchBar } from "react-native-elements";
import { useFetchVenues } from "../api";
import MyButton from "../components/MyButton";
import { useFocusEffect } from "@react-navigation/native";
import { filterVenues } from "../helpers";
import { regFont } from "../theme";
import { useUser } from "../Contexts/UserContext";

const HomeScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);

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
    <View style={{ flex: 1 }}>
      <>
        <SearchBar
          placeholder="search a venue"
          value={search}
          onChangeText={(search) => setSearch(search)}
          style={{ flex: 1, fontFamily: regFont.fontFamily }}
        />
        {!userLoading && !isLoading && (
          <FlatList
            data={result.map((fuseResult) => fuseResult?.item || fuseResult)}
            renderItem={({ item, index }) => (
              <HomePageFlatListItem item={item} navigation={navigation} />
            )}
            ItemSeparatorComponent={<FlatListSeparator />}
            keyExtractor={(item, index) => item?._id || index.toString()}
          />
        )}
        <MyButton
          title="Create New Venue"
          onPress={() => navigation.navigate("NewVenue")}
        />
      </>
    </View>
  );
};
export default HomeScreen;
