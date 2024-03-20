import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { myColors } from "../theme.js";

const GoogleMapComp = ({ address }) => {
  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: 45.231,
  });

  const { isLoading, isError, data } = useQuery(
    ["coordinates", address],
    async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${"AIzaSyCRH38tk2q3mZJinvxYKmH6XBGJNnXQEtQ"}`
      );

      //maps.googleapis.com/maps/api/geocode/outputFormat?parameters
      // console.log(response, "the response");

      console.log(response, "the repo");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      return json;
    }
  );

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      setCoordinates({
        latitude: location.lat,
        longitude: location.lng,
      });
    }
  }, [data]);

  // if (isLoading) return <LoadingSpinner />;
  // if (isError) return <ErrorComponent />;

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
        coordinate={coordinates}
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
    borderColor: myColors.black,
    borderWidth: 4,
    margin: 20,
  },
});
export default GoogleMapComp;
