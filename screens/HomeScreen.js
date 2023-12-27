import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import HomePageFlatListItem from "../components/HomePageFlatListItem";
import { mockVenues } from "../dataModels";
import FlatListSeparator from "../components/FlatListSeparator";
import { SearchBar } from "react-native-elements";
import Fuse from "fuse.js";
import { useUser } from "../UserContext";
import { fetchVenues } from "../api";
import MyButton from "../components/MyButton";
const HomeScreen = ({ navigation }) => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);

  const getAllVenues = async () => {
    const response = await fetchVenues();
    setVenues(response);
  };

  useEffect(() => {
    getAllVenues();
  }, []);

  const fuse = new Fuse(venues, {
    keys: ["name", "address"],
    minMatchCharLength: 1,
    includeScore: true,
    threshold: 0.3,
  });
  const result = search ? fuse.search(search) : venues;

  return (
    <View>
      <SearchBar
        placeholder="Hi bitch"
        value={search}
        onChangeText={(search) => setSearch(search)}
      />
      <FlatList
        style={{ backgroundColor: "pink" }}
        data={result.map((fuseResult) => fuseResult?.item || fuseResult)}
        renderItem={({ item, index }) => (
          <HomePageFlatListItem item={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={<FlatListSeparator />}
        keyExtractor={(item, index) => item?._id || index.toString()}
      />
      <MyButton
        title="Create New Venue"
        onPress={() => navigation.navigate("NewVenue")}
      />
    </View>
  );
};

export default HomeScreen;
