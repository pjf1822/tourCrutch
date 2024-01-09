import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  Button,
} from "react-native";
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
import FilesModal from "../components/Drawer/FilesModal";

const VenueDetailScreen = ({ route, navigation }) => {
  const deleteVenueMutation = useDeleteVenue();
  const updateVenueInfoMutation = useUpdateVenueInfo();

  const { venueId } = route.params;
  const { user, setLoading: setUserLoading } = useUser();
  const [isModalVisible, setModalVisible] = useState(false);
  const [venueInfo, setVenueInfo] = useState({
    name: "",
    address: "",
    link: "",
    pdfs: [],
    comments: [],
    createdByUID: "",
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      console.log(updatedInfo, "the thing");
      if (updatedInfo === undefined) {
        return;
      }
      setVenueInfo(updatedInfo.venue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/festival.jpg")}
      style={styles.imagePageWrapper}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={{ marginTop: windowHeight / upperMargin.margy }}>
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
        <MyButton title="Venue Files" onPress={toggleModal} />

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
      <FilesModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        venueInfo={venueInfo}
        venueData={venueData}
        updateVenueInfoMutation={updateVenueInfoMutation}
        venueId={venueId}
        user={user}
        setVenueInfo={setVenueInfo}
        handleUploadPdf={handleUploadPdf}
      />
    </ImageBackground>
  );
};

export default VenueDetailScreen;

const styles = StyleSheet.create({
  imagePageWrapper: {
    backgroundColor: myColors.blue,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  itemStyle: {
    fontFamily: regFont.fontFamily,
  },
});
