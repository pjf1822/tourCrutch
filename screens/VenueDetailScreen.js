import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDeleteVenue, useFetchVenueById, useUpdateVenueInfo } from "../api";
import { showToast } from "../helpers";
import { myColors, regFont } from "../theme";
import { useUser } from "../Contexts/UserContext";
import FilesModal from "../components/FilesModal";
import ContactSection from "../components/ContactSection";
import DisplayedDataForm from "../components/DisplayedDataForm";
import UpdateDataFormModal from "../components/UpdateDataFormModal";
import CommentsModal from "../components/CommentsModal";
import Icon from "react-native-vector-icons/FontAwesome";
import AddContactCardModal from "../components/AddContactCardModel";
import DescriptionSection from "../components/DescriptionSection";
import MyButton from "../components/MyComponents/MyButton";
import { uploadPDF } from "../functionUtils/storageFunctionUtils";
import GoogleMapComp from "../components/GoogleMapComp";
import YelpList from "../components/YelpList";

const VenueDetailScreen = ({ route, navigation }) => {
  const deleteVenueMutation = useDeleteVenue();
  const updateVenueInfoMutation = useUpdateVenueInfo();

  const { venueId } = route.params;
  const { user, setLoading: setUserLoading } = useUser();
  const [isPDFModalVisible, setIsPDFModalVisible] = useState(false);
  const [isVenueDataModalVisible, setIsVenueDataModalVisible] = useState(false);
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [PDFUploadProgress, setPDFUploadProgress] = useState(0);

  const [updatedVenueData, setUpdatedVenueData] = useState({
    name: "",
    address: "",
    link: "",
    pdfs: [],
    comments: [],
    contactCards: [],
    createdByUID: "",
    description: "",
    coordinates: {},
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

  const {
    data: initialVenueData,
    isLoading,
    isError,
    refetch,
  } = useFetchVenueById(venueId);

  useEffect(() => {
    if (initialVenueData) {
      setUpdatedVenueData({
        name: initialVenueData.name,
        address: initialVenueData.address,
        link: initialVenueData.link,
        pdfs: initialVenueData.pdfs || [],
        comments: initialVenueData.comments,
        createdByUID: initialVenueData.createdByUID,
        contactCards: initialVenueData?.contactCards,
        description: initialVenueData.description,
        coordinates: initialVenueData.coordinates,
      });
    }
  }, [initialVenueData]);

  const handleUploadPdf = async () => {
    if (initialVenueData?.pdfs?.length >= 8) {
      showToast("This venue has too many files", false, "top");
      return;
    }

    try {
      const updatedInfo = await uploadPDF(
        updateVenueInfoMutation,
        venueId,
        updatedVenueData?.createdByUID,
        user?.uid,
        initialVenueData,
        {
          name: updatedVenueData.name,
          address: updatedVenueData.address,
          link: updatedVenueData.link,
          pdfs: updatedVenueData.pdfs,
        },
        (progress) => {
          setPDFUploadProgress(progress);
        }
      );
      if (updatedInfo === undefined) {
        return;
      }
      setUpdatedVenueData(updatedInfo.venue);
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
      <DisplayedDataForm
        updatedVenueData={updatedVenueData}
        windowHeight={windowHeight}
      />

      <ScrollView
        showsVerticalScrollIndicator="false"
        contentContainerStyle={{ marginLeft: 7, marginRight: 7 }}
      >
        <ContactSection
          updatedVenueData={updatedVenueData}
          updateVenueInfoMutation={updateVenueInfoMutation}
          venueId={venueId}
          user={user}
          initialVenueData={initialVenueData}
          setUpdatedVenueData={setUpdatedVenueData}
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
          {updatedVenueData?.contactCards?.length === 0 && (
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
                  fontSize: Platform.OS === "ios" && Platform.isPad ? 23 : 16,
                }}
              >
                Add Contact Cards
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {updatedVenueData?.coordinates?.longitude && (
          <GoogleMapComp
            address={updatedVenueData.address}
            coordinates={updatedVenueData.coordinates}
          />
        )}

        {updatedVenueData?.coordinates?.longitude && (
          <YelpList coordinates={updatedVenueData.coordinates} />
        )}
      </ScrollView>
      {/* <DescriptionSection
          updatedVenueData={updatedVenueData}
          setUpdatedVenueData={setUpdatedVenueData}
          updateVenueInfoMutation={updateVenueInfoMutation}
          venueId={venueId}
          user={user}
          initialVenueData={initialVenueData}
        /> */}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingBottom: windowHeight / 29,
          paddingTop: 8,
          // backgroundColor: "rgba(0, 0, 220, 0.0.4)",
        }}
      >
        <MyButton
          title="Venue Files"
          onPress={togglePDFModal}
          warning={false}
          width={"80%"}
          iphoneFontSize={19}
        />
        <View style={{ height: 5 }}></View>
        <MyButton
          title="Update Venue"
          onPress={toggleVenueDataModal}
          warning={false}
          width={"80%"}
          iphoneFontSize={19}
        />
        <View style={{ height: 5 }}></View>

        <MyButton
          title="Comment Section"
          onPress={toggleCommentsModal}
          warning={false}
          width={"80%"}
          iphoneFontSize={19}
        />
      </View>

      <FilesModal
        isPDFModalVisible={isPDFModalVisible}
        togglePDFModal={togglePDFModal}
        updatedVenueData={updatedVenueData}
        initialVenueData={initialVenueData}
        updateVenueInfoMutation={updateVenueInfoMutation}
        venueId={venueId}
        user={user}
        setUpdatedVenueData={setUpdatedVenueData}
        handleUploadPdf={handleUploadPdf}
        PDFUploadProgress={PDFUploadProgress}
      />
      <UpdateDataFormModal
        isVenueDataModalVisible={isVenueDataModalVisible}
        toggleVenueDataModal={toggleVenueDataModal}
        updatedVenueData={updatedVenueData}
        updateVenueInfoMutation={updateVenueInfoMutation}
        venueId={venueId}
        user={user}
        initialVenueData={initialVenueData}
        navigation={navigation}
        deleteVenueMutation={deleteVenueMutation}
        windowHeight={windowHeight}
        setUpdatedVenueData={setUpdatedVenueData}
        refetch={refetch}
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
        updatedVenueData={updatedVenueData}
        updateVenueInfoMutation={updateVenueInfoMutation}
        venueId={venueId}
        user={user}
        initialVenueData={initialVenueData}
        setUpdatedVenueData={setUpdatedVenueData}
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
