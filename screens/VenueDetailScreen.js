import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { useDeleteVenue, useFetchVenueById, useUpdateVenueInfo } from "../api";
import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";
import { myColors, regFont } from "../theme";
import { useUser } from "../Contexts/UserContext";
import { uploadPDF } from "../storageFunctionUtils";
import MyTextInput from "../components/MyTextInput";
import RenderPDFItem from "../components/RenderPDFItem";

const VenueDetailScreen = ({ route, navigation }) => {
  const deleteVenueMutation = useDeleteVenue();
  const updateVenueInfoMutation = useUpdateVenueInfo();
  const { venueId } = route.params;
  const { user, setLoading: setUserLoading } = useUser();
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
        updateVenueInfoMutation,
        venueId,
        venueInfo?.createdByUID,
        user?.uid,
        name,
        address,
        link,
        venueInfo.pdfs
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.pageWrapper}>
      <View>
        <MyTextInput
          style={styles.itemStyle}
          value={venueInfo.name}
          onChangeText={(newName) =>
            setVenueInfo((prev) => ({ ...prev, name: newName }))
          }
        />
        <MyTextInput
          style={styles.itemStyle}
          value={venueInfo.address}
          onChangeText={(newAddress) =>
            setVenueInfo((prev) => ({ ...prev, address: newAddress }))
          }
        />
        <MyTextInput
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
      </View>

      <CommentSection
        venueId={venueId}
        userId={user?.uid}
        displayName={user?.displayName}
      />
      <View>
        <MyButton title="Upload Pdf" onPress={handleUploadPdf} />

        <FlatList
          data={venueInfo?.pdfs}
          renderItem={({ item }) => (
            <RenderPDFItem
              updateVenueInfoMutation={updateVenueInfoMutation}
              venueId={venueId}
              createdByUID={venueInfo?.createdByUID}
              userUID={user?.uid}
              name={venueData?.name}
              address={venueData?.address}
              link={venueData?.link}
              item={item}
            />
          )}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={
            <View
              style={{
                width: 1,
                marginLeft: 10,
                marginRight: 10,
                backgroundColor: myColors,
              }}
            ></View>
          }
        />
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
      </View>
    </View>
  );
};

export default VenueDetailScreen;

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: myColors.blue,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  itemStyle: {
    fontFamily: regFont.fontFamily,
  },
});
