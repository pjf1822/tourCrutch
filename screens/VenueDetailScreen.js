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
  const updateVenueInfoMutation = useUpdateVenueInfo();

  const [venueInfo, setVenueInfo] = useState({
    name: venue?.name,
    address: venue?.address,
    link: venue?.link,
  });
  return (
    <View>
      <TextInput
        value={venueInfo.name}
        onChangeText={(newName) =>
          setVenueInfo((prev) => ({ ...prev, name: newName }))
        }
      />
      <TextInput
        value={venueInfo.address}
        onChangeText={(newAddress) =>
          setVenueInfo((prev) => ({ ...prev, address: newAddress }))
        }
      />
      <TextInput
        value={venueInfo.link}
        onChangeText={(newLink) =>
          setVenueInfo((prev) => ({ ...prev, link: newLink }))
        }
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
            venueInfo.name,
            venueInfo.address,
            venueInfo.link
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
