import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { useDeleteVenue, useUpdateVenueInfo } from "../api";
import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";
import { regFont } from "../theme";
import { useUser } from "../Contexts/UserContext";
import { getVenuePDF, uploadPDF } from "../storageFunctionUtils";

const VenueDetailScreen = ({ route, navigation }) => {
  const { venue } = route.params;
  const { user } = useUser();

  const deleteVenueMutation = useDeleteVenue();
  const updateVenueInfoMutation = useUpdateVenueInfo();

  const [venueInfo, setVenueInfo] = useState({
    name: venue?.name,
    address: venue?.address,
    link: venue?.link,
    pdfs: venue?.pdfs,
  });
  console.log();

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
      {venueInfo.pdfs.map((pdf, i) => (
        <TouchableOpacity key={i} onPress={() => getVenuePDF(venue._id, pdf)}>
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../assets/pdf.png")}
          />
          <Text>{pdf}</Text>
        </TouchableOpacity>
      ))}

      <MyButton
        title="update venue info"
        onPress={() => {
          const { name, address, link, pdfs } = venueInfo;

          if (
            name !== venue?.name ||
            address !== venue?.address ||
            link !== venue?.link
          ) {
            handleUpdateVenueInfo(
              navigation,
              updateVenueInfoMutation,
              venue._id,
              venue?.createdByUID,
              user?.uid,
              name,
              address,
              link,
              pdfs
            );
          } else {
            showToast("You didnt change anything bozo", false, "top");
          }
        }}
      />

      <CommentSection
        venueId={venue?._id}
        userId={user?.uid}
        displayName={user?.displayName}
      />
      <MyButton
        title="Upload Pdf"
        onPress={() => {
          const { name, address, link } = venueInfo;
          uploadPDF(
            navigation,
            updateVenueInfoMutation,
            venue._id,
            venue?.createdByUID,
            user?.uid,
            name,
            address,
            link
          );
        }}
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

      <MyButton title="Get Venue PDF" onPress={() => getVenuePDF(venue._id)} />
    </View>
  );
};

export default VenueDetailScreen;

const styles = StyleSheet.create({
  itemStyle: {
    fontFamily: regFont.fontFamily,
  },
});
