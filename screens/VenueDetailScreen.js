import { View, Image, TextInput } from "react-native";
import React, { useState } from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { useDeleteVenue, useUpdateVenueInfo } from "../api";
import { useUser } from "../UserContext";
import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";

const VenueDetailScreen = ({ route, navigation }) => {
  const { id, venue } = route.params;
  const { user } = useUser();
  const deleteVenueMutation = useDeleteVenue();
  const [venueName, setVenueName] = useState(venue?.name);
  const [venueAddress, setVenueAddress] = useState(venue?.address);
  const [venueLink, setVenueLink] = useState(venue?.link);
  const updateVenueInfoMutation = useUpdateVenueInfo();

  return (
    <View>
      <TextInput
        value={venueName}
        onChangeText={(newName) => setVenueName(newName)}
      />
      <TextInput
        value={venueAddress}
        onChangeText={(newAddress) => setVenueAddress(newAddress)}
      />
      <TextInput
        value={venueLink}
        onChangeText={(newLink) => setVenueLink(newLink)}
      />
      {venue?.image && (
        <Image
          source={{ uri: venue?.image }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <MyButton
        title="update venue info"
        onPress={() =>
          handleUpdateVenueInfo(
            updateVenueInfoMutation,
            id,
            venueName,
            venueAddress,
            venueLink
          )
        }
      />

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
