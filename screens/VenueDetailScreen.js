import { View, Text, Image } from "react-native";
import React from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { updateVenueInfo, useDeleteVenue } from "../api";
import { useUser } from "../UserContext";

const VenueDetailScreen = ({ route, navigation }) => {
  const { id, venue } = route.params;
  const { user } = useUser();
  const deleteVenueMutation = useDeleteVenue();

  const handleUpdateVenueInfo = async () => {
    const response = await updateVenueInfo(id, updatedData);
  };
  const handleDelete = async (venueId) => {
    try {
      if (!venue?.createdByUID) {
        throw new Error(
          "Venue createdByUID not found. Unable to delete venue."
        );
      }
      if (venue.createdByUID !== user.uid) {
        throw new Error("User does not have permission to delete this venue.");
      }

      const result = await deleteVenueMutation.mutateAsync(venueId);
      navigation.navigate("Home", { venueDeleted: true, venueId: id });
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
      <MyButton title="Delete Venue" onPress={() => handleDelete(venue?._id)} />
    </View>
  );
};

export default VenueDetailScreen;
