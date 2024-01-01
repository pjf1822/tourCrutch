import { View, Text, Image } from "react-native";
import React from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { updateVenueInfo, useDeleteVenue } from "../api";

const VenueDetailScreen = ({ route }) => {
  const { id, venue } = route.params;

  const handleUpdateVenueInfo = async () => {
    const response = await updateVenueInfo(id, updatedData);
  };
  const deleteVenueMutation = useDeleteVenue();

  const handleDelete = async (venueId) => {
    try {
      if (venue.createdByUID === users.uid) {
        const result = await deleteVenueMutation.mutateAsync(venueId);
      }
    } catch (error) {
      console.error("Failed to delete venue:", error);
    }
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
      <MyButton title="Delete Venue" onPress={handleDelete} />
    </View>
  );
};

export default VenueDetailScreen;
