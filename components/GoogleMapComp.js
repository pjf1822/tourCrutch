import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { myColors } from "../theme.js";
import { GOOGLE_MAP_KEY } from "@env";

const GoogleMapComp = ({ address, coordinates }) => {
  // console.log(coordinates, typeof coordinates.latitude);
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return null;
  }

  // const { isLoading, isError, data } = useQuery(
  //   ["coordinates", address],
  //   async () => {
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //         address
  //       )}&key=${GOOGLE_MAP_KEY}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const json = await response.json();
  //     console.log(json, "the json");
  //     return json;
  //   }
  // );

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }}
        title="Marker Title"
        description="Marker Description"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    borderRadius: 50,
    borderColor: myColors.beige,
    borderWidth: 4,
    margin: 20,
  },
});
export default GoogleMapComp;
