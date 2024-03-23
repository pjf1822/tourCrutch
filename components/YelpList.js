import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { YELP_KEY } from "@env";

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
  console.log(restaurants);
  return (
    <ScrollView>
      <View>
        {restaurants &&
          restaurants.map((place) => (
            <TouchableOpacity
              key={place.id}
              onPress={() => handlePress(place.url)}
            >
              <Text>{place.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default YelpList;
