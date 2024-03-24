import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { YELP_KEY } from "@env";
import { myColors, regFont } from "../theme";

const YelpList = ({ coords }) => {
  const fetchRestaurants = async () => {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?latitude=${coords.latitude}&longitude=${coords.longitude}&radius=16093&categories=restaurants&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${YELP_KEY}`,
        },
      }
    );
    const data = await response.json();
    console.log(data, "teh datae");
    return data.businesses;
  };

  const {
    data: restaurants,
    error,
    isLoading,
  } = useQuery("restaurants", fetchRestaurants);

  const handlePress = (url) => {
    Linking.openURL(url);
  };
  return (
    <ScrollView style={styles.wrapper}>
      <View>
        {restaurants &&
          restaurants.map((place) => (
            <TouchableOpacity
              key={place.id}
              onPress={() => handlePress(place.url)}
            >
              <Text style={styles.listItem}>{place.name}</Text>
              <Image source={{ uri: place.image_url }} style={styles.image} />
              <Text style={styles.listItem}>
                {place.distance.toFixed()} meters away
              </Text>
              <View></View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColors: myColors.black,
    backgroundColor: myColors.beige,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    padding: 5,
    minWidth: 120,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  listItem: {
    fontFamily: regFont.fontFamily,
  },
});

export default YelpList;
