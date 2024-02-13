import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import MyBottomRowButton from "../components/MyBottomRowButton";
import { useDeleteVenue, useFetchVenueById, useUpdateVenueInfo } from "../api";
import { showToast } from "../helpers";
import { myColors, regFont, upperMargin } from "../theme";
import { useUser } from "../Contexts/UserContext";
import { uploadPDF } from "../storageFunctionUtils";
import FilesModal from "../components/FilesModal";
import ContactSection from "../components/ContactSection";
import DisplayedDataForm from "../components/DisplayedDataForm";
import UpdateDataFormModal from "../components/UpdateDataFormModal";
import CommentsModal from "../components/CommentsModal";
import Icon from "react-native-vector-icons/FontAwesome";
import AddContactCardModal from "../components/AddContactCardModel";
import DescriptionSection from "../components/DescriptionSection";

const VenueDetailScreen = ({ route, navigation }) => {
  const deleteVenueMutation = useDeleteVenue();
  const updateVenueInfoMutation = useUpdateVenueInfo();

  const { venueId } = route.params;
  const { user, setLoading: setUserLoading } = useUser();
  const [isPDFModalVisible, setIsPDFModalVisible] = useState(false);
  const [isVenueDataModalVisible, setIsVenueDataModalVisible] = useState(false);
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  const [venueInfo, setVenueInfo] = useState({
    name: "",
    address: "",
    link: "",
    pdfs: [],
    comments: [],
    contactCards: [],
    createdByUID: "",
    description: "",
  });

  const togglePDFModal = () => {
    setIsPDFModalVisible(!isPDFModalVisible);
  };
  const toggleVenueDataModal = () => {
    setIsVenueDataModalVisible(!isVenueDataModalVisible);
  };
  const toggleCommentsModal = () => {
    setIsCommentsModalVisible(!isCommentsModalVisible);
  };
  const toggleContactModal = () => {
    setIsContactModalVisible(!isContactModalVisible);
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
        contactCards: venueData?.contactCards,
        description: venueData.description,
      });
    }
  }, [venueData]);

  const handleUploadPdf = async () => {
    if (venueData?.pdfs?.length >= 8) {
      showToast("This venue has too many files", false, "top");
      return;
    }

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
      <View
        style={{
          marginTop: windowHeight / upperMargin.margy,
          marginLeft: 7,
          marginRight: 7,
        }}
      >
        <DisplayedDataForm venueInfo={venueInfo} />
        <ContactSection
          venueInfo={venueInfo}
          updateVenueInfoMutation={updateVenueInfoMutation}
          venueId={venueId}
          user={user}
          venueData={venueData}
          setVenueInfo={setVenueInfo}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={toggleContactModal}>
            <Icon
              name="plus"
              style={{ color: "white", fontSize: 24, marginTop: 6 }}
            />
          </TouchableOpacity>
          {venueInfo?.contactCards?.length === 0 && (
            <TouchableOpacity
              onPress={toggleContactModal}
              style={{
                backgroundColor: myColors.beige,
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: regFont.fontFamily,
                  padding: 10,
                  fontSize: 16,
                }}
              >
                Add Contact Cards
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <DescriptionSection
          venueInfo={venueInfo}
          setVenueInfo={setVenueInfo}
          updateVenueInfoMutation={updateVenueInfoMutation}
          venueId={venueId}
          user={user}
          venueData={venueData}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: windowHeight / 13,
        }}
      >
        <MyBottomRowButton
          title="Venue Files"
          onPress={togglePDFModal}
          width={"33%"}
        />
        <MyBottomRowButton
          title="Update Venue"
          onPress={toggleVenueDataModal}
          width={"33%"}
        />
        <MyBottomRowButton
          title="Comment Section"
          onPress={toggleCommentsModal}
          width={"33%"}
        />
      </View>

      <FilesModal
        isPDFModalVisible={isPDFModalVisible}
        togglePDFModal={togglePDFModal}
        venueInfo={venueInfo}
        venueData={venueData}
        updateVenueInfoMutation={updateVenueInfoMutation}
        venueId={venueId}
        user={user}
        setVenueInfo={setVenueInfo}
        handleUploadPdf={handleUploadPdf}
      />
      <UpdateDataFormModal
        isVenueDataModalVisible={isVenueDataModalVisible}
        toggleVenueDataModal={toggleVenueDataModal}
        venueInfo={venueInfo}
        updateVenueInfoMutation={updateVenueInfoMutation}
        venueId={venueId}
        user={user}
        venueData={venueData}
        navigation={navigation}
        deleteVenueMutation={deleteVenueMutation}
        windowHeight={windowHeight}
        setVenueInfo={setVenueInfo}
      />
      <CommentsModal
        isCommentsModalVisible={isCommentsModalVisible}
        toggleCommentsModal={toggleCommentsModal}
        venueId={venueId}
        user={user}
      />
      <AddContactCardModal
        isContactModalVisible={isContactModalVisible}
        toggleContactModal={toggleContactModal}
        venueInfo={venueInfo}
        updateVenueInfoMutation={updateVenueInfoMutation}
        venueId={venueId}
        user={user}
        venueData={venueData}
        setVenueInfo={setVenueInfo}
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
});
