import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import MyButton from "../components/MyButton";
import { useDeleteVenue, useFetchVenueById, useUpdateVenueInfo } from "../api";
import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";
import { myColors, regFont, upperMargin } from "../theme";
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
  const windowHeight = Dimensions.get("window").height;

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
      const updatedInfo = await uploadPDF(
        updateVenueInfoMutation,
        venueId,
        venueInfo?.createdByUID,
        user?.uid,
        venueData,
        {
          name: venueInfo.name,
          address: venueInfo.address,
          link: venueInfo.link,
          pdfs: venueInfo.pdfs,
        }
      );
      setVenueInfo(updatedInfo.venue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={[
        styles.pageWrapper,
        { marginTop: windowHeight / upperMargin.margy },
      ]}
    >
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
                venueData,
                {
                  name,
                  address,
                  link,
                }
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
        <FlatList
          data={venueInfo?.pdfs}
          renderItem={({ item }) => (
            <RenderPDFItem
              updateVenueInfoMutation={updateVenueInfoMutation}
              venueId={venueId}
              createdByUID={venueInfo?.createdByUID}
              userUID={user?.uid}
              venueData={venueData}
              item={item}
              setVenueInfo={setVenueInfo}
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
                backgroundColor: myColors.black,
              }}
            ></View>
          }
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
