import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { myColors } from "../theme.js";

const GoogleMapComp = ({ coordinates }) => {
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    // Increment the key to force a re-render whenever coordinates change
    setMapKey((prevKey) => prevKey + 1);
  }, [coordinates]);

  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return null;
  }

  return (
    <MapView
      key={mapKey}
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
  map: {
    flex: 1,
    width: "100%",
    borderRadius: 50,
    borderColor: myColors.beige,
    borderWidth: 4,
    marginTop: 20,
    marginBottom: 20,
    minHeight: 300,
  },
});
export default GoogleMapComp;
