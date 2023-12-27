import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { updateVenueInfo } from "../api";

const VenueDetailScreen = ({ route }) => {
  const { id, venue } = route.params;

  const handleUpdateVenueInfo = async () => {
    const response = await updateVenueInfo(id, updatedData);
  };

  return (
    <View>
      <Text>{venue?.name}</Text>
      <Text>{venue?.address}</Text>
      {venue?.image && (
        <Image
          source={{ uri: venue?.image }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <MyButton title="update venue info" onPress={handleUpdateVenueInfo} />

      <CommentSection venueId={id} />
    </View>
  );
};

export default VenueDetailScreen;
