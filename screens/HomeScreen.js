import { View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HomePageFlatListItem from "../components/HomePageFlatListItem";
import FlatListSeparator from "../components/FlatListSeparator";
import { SearchBar } from "react-native-elements";
import { useUser } from "../UserContext";
import { useFetchVenues } from "../api";
import MyButton from "../components/MyButton";
import GlobalLoader from "../GlobalLoader";
import { useFocusEffect } from "@react-navigation/native";
import { filterVenues } from "../helpers";

const HomeScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);

  const { loading: userLoading } = useUser();
  const { data: fetchedVenues, isLoading, isError, refetch } = useFetchVenues();

  useEffect(() => {
    if (!isLoading && !isError) {
      setVenues(fetchedVenues || []);
    }
  }, [fetchedVenues, isLoading, isError]);

  const result = filterVenues(venues, search);

  useFocusEffect(
    useCallback(() => {
      console.log(route.params);
      if (route?.params?.venueCreated) {
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
        venueId: null,
      });
    }
  }, [route?.params?.venueCreated, route?.params?.venueDeleted, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Hi bitc"
        value={search}
        onChangeText={(search) => setSearch(search)}
      />
      {(userLoading || isLoading) && <GlobalLoader />}
      {!userLoading && !isLoading && (
        <FlatList
          style={{ backgroundColor: "pink" }}
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
    </View>
  );
};

export default HomeScreen;
