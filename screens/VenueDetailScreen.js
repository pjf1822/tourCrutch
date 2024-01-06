import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { useDeleteVenue, useFetchVenueById, useUpdateVenueInfo } from "../api";
import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";
import { regFont } from "../theme";
import { useUser } from "../Contexts/UserContext";
import { getVenuePDF, uploadPDF } from "../storageFunctionUtils";

const VenueDetailScreen = ({ route, navigation }) => {
  const deleteVenueMutation = useDeleteVenue();
  const updateVenueInfoMutation = useUpdateVenueInfo();
  const { venueId } = route.params;
  const { user } = useUser();
  const [venueInfo, setVenueInfo] = useState({
    name: "",
    address: "",
    link: "",
    pdfs: [],
    comments: [],
    createdByUID: "",
  });
  const { data: venueData, isLoading, isError } = useFetchVenueById(venueId);

  useEffect(() => {
    if (venueData) {
      setVenueInfo({
        name: venueData.name,
        address: venueData.address,
        link: venueData.link,
        pdfs: venueData.pdfs || [],
        comments: venueData.comments,
        createdByUID: venueData.createdByUID,
      });
    }
  }, [venueData]);

  const handleUploadPdf = async () => {
    try {
      const { name, address, link } = venueInfo;
      const updatedInfo = await uploadPDF(
        navigation,
        updateVenueInfoMutation,
        venueId,
        venueInfo?.createdByUID,
        user?.uid,
        name,
        address,
        link
      );
    } catch (error) {
      console.error(error);
    }
  };
  const renderPdfItem = ({ item }) => (
    <TouchableOpacity onPress={() => getVenuePDF(venueId, item)}>
      <Image
        style={{ height: 20, width: 20 }}
        source={require("../assets/pdf.png")}
      />
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching venue details</Text>;
  }
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

      <MyButton
        title="update venue info"
        onPress={() => {
          const { name, address, link, pdfs } = venueInfo;

          if (
            name !== venueData?.name ||
            address !== venueData?.address ||
            link !== venueData?.link
          ) {
            handleUpdateVenueInfo(
              navigation,
              updateVenueInfoMutation,
              venueId,
              venueInfo?.createdByUID,
              user?.uid,
              name,
              address,
              link,
              null
            );
          } else {
            showToast("You didnt change anything bozo", false, "top");
          }
        }}
      />

      <CommentSection
        venueId={venueId}
        userId={user?.uid}
        displayName={user?.displayName}
      />
      <MyButton title="Upload Pdf" onPress={handleUploadPdf} />
      <MyButton
        title="Delete Venue"
        onPress={() =>
          handleDelete(
            venueId,
            venueInfo?.createdByUID,
            user?.uid,
            navigation,
            deleteVenueMutation
          )
        }
      />

      <FlatList
        data={venueInfo?.pdfs}
        renderItem={renderPdfItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={
          <View
            style={{
              height: "100%",
              width: 1,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "black",
            }}
          ></View>
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
