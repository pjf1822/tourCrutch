import { View, Text, FlatList, Button } from "react-native";
import React, { useCallback, useState } from "react";
import HomePageFlatListItem from "../components/HomePageFlatListItem";
import FlatListSeparator from "../components/FlatListSeparator";
import { SearchBar } from "react-native-elements";
import Fuse from "fuse.js";
import { useUser } from "../UserContext";
import { useFetchVenues } from "../api";
import MyButton from "../components/MyButton";
import { signOut } from "../authFunctionUtils";
import GlobalLoader from "../GlobalLoader";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation, route }) => {
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const { loading: userLoading } = useUser();

  const { data: venues, isLoading, isError, refetch } = useFetchVenues();

  const fuse = new Fuse(venues, {
    keys: ["name", "address"],
    minMatchCharLength: 1,
    includeScore: true,
    threshold: 0.3,
  });
  const result = search ? fuse.search(search) : venues || [];

  useFocusEffect(
    useCallback(() => {
      // Check if a new venue has been created
      if (route.params?.venueCreated) {
        console.log("we have a new venue");
        refetch();
      }
    }, [route.params?.venueCreated, refetch])
  );
  return (
    <View>
      <SearchBar
        placeholder="Hi bitch"
        value={search}
        onChangeText={(search) => setSearch(search)}
      />
      <Text>{user?.email}</Text>
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
      <Button title="signout" onPress={() => signOut()} />
    </View>
  );
};

export default HomeScreen;
