import { View, Image, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { useDeleteVenue, useUpdateVenueInfo } from "../api";
import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";
import { regFont } from "../theme";
import { useUser } from "../Contexts/UserContext";

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
        style={styles.itemStyle}
        value={venueInfo.name}
        onChangeText={(newName) =>
          setVenueInfo((prev) => ({ ...prev, name: newName }))
        }
      />
      <TextInput
        style={styles.itemStyle}
        value={venueInfo.address}
        onChangeText={(newAddress) =>
          setVenueInfo((prev) => ({ ...prev, address: newAddress }))
        }
      />
      <TextInput
        style={styles.itemStyle}
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
        onPress={() => {
          const { name, address, link } = venueInfo;

          if (
            name !== venue?.name ||
            address !== venue?.address ||
            link !== venue?.link
          ) {
            handleUpdateVenueInfo(
              navigation,
              updateVenueInfoMutation,
              id,
              name,
              address,
              link
            );
          } else {
            showToast("You didnt change anything bozo", false, "top");
          }
        }}
      />

      <CommentSection
        venueId={id}
        userId={user?.uid}
        comments={venue.comments}
        displayName={user?.displayName}
        userPhoto={user?.photoURL}
      />
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

const styles = StyleSheet.create({
  itemStyle: {
    fontFamily: regFont.fontFamily,
  },
});
