import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Stars from "react-native-stars";

import { YELP_KEY } from "@env";
import { myColors, regFont } from "../theme";

const YelpList = ({ coordinates }) => {
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        `https://api.yelp.com/v3/businesses/search?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&radius=16093&categories=restaurants&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${YELP_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data.businesses;
    } catch (error) {
      console.error("Failed to fetch data from Yelp:", error);
      return [];
    }
  };
  const {
    data: restaurants = [],
    isLoading,
    refetch,
  } = useQuery("restaurants", fetchRestaurants);

  useEffect(() => {
    refetch();
  }, [coordinates]);

  const handlePress = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.listItem, { fontSize: 20, paddingBottom: 8 }]}>
        Local Eats
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {restaurants &&
          restaurants.map((place, index) => (
            <TouchableOpacity
              key={place?.id}
              onPress={() => handlePress(place?.url)}
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
                borderTopWidth: index === 0 ? "" : 2,
                borderColor: myColors.pink,
                paddingTop: 5,
                marginBottom: 3,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "start",
                }}
              >
                <Text style={[styles.listItem, { marginBottom: 7 }]}>
                  {place?.name}
                </Text>
                <Image
                  source={{ uri: place?.image_url }}
                  style={styles.image}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.listItem}>
                  {(place?.distance * 0.000621371).toFixed(2)} miles away
                </Text>
                <Stars
                  default={place?.rating}
                  count={5}
                  half={true}
                  disabled={true}
                  starSize={100}
                  fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                  emptyStar={
                    <Icon
                      name={"star-outline"}
                      style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                    />
                  }
                  halfStar={
                    <Icon name={"star-half"} style={[styles.myStarStyle]} />
                  }
                />
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColors: myColors.black,
    backgroundColor: myColors.beige,
    borderRadius: 10,
    maxHeight: 300,
    width: "100%",
    display: "flex",
    alignSelf: "center",
    marginBottom: 20,
    padding: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: myColors.pink,
  },

  listItem: {
    fontFamily: regFont.fontFamily,
    fontSize: 15,
  },
  myStarStyle: {
    color: myColors.pink,
    backgroundColor: "transparent",
    textShadowColor: myColors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: myColors.pink,
  },
});

export default YelpList;
