import { View, Text, Image } from "react-native";
import React from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { updateVenueInfo, useDeleteVenue } from "../api";
import { useUser } from "../UserContext";
import { handleDelete } from "../crudUtils/venue";

const VenueDetailScreen = ({ route, navigation }) => {
  const { id, venue } = route.params;
  const { user } = useUser();
  const deleteVenueMutation = useDeleteVenue();

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
      <MyButton
        title="Delete Venue"
        onPress={() =>
          handleDelete(
            venue?._id,
            venue?.createdByUID,
            user?.uid,
            navigation,
            deleteVenueMutation
          )
        }
      />
    </View>
  );
};

export default VenueDetailScreen;
