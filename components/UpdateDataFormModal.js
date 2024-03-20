import { View, StyleSheet, Platform, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";

import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";
import { myColors, regFont } from "../theme";
import Modal from "react-native-modal";
import MyLongPressButton from "./MyComponents/MyLongPressButton";
import VenueForm from "./VenueForm";

const UpdateDataFormModal = ({
  isVenueDataModalVisible,
  toggleVenueDataModal,
  updatedVenueData,
  updateVenueInfoMutation,
  venueId,
  user,
  initialVenueData,
  navigation,
  deleteVenueMutation,
  windowHeight,
  setUpdatedVenueData,
  refetch,
}) => {
  // clean keyboard attempt beginning
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height - 90);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const modalPosition =
    Platform.OS === "ios" ? { marginTop: keyboardHeight } : {};
  // clean keyboard attempt end

  const handleUpdate = async (values) => {
    const { name, address, link } = values;

    if (
      name !== initialVenueData?.name ||
      address !== initialVenueData?.address ||
      link !== initialVenueData?.link
    ) {
      const response = await handleUpdateVenueInfo(
        updateVenueInfoMutation,
        venueId,
        updatedVenueData?.createdByUID,
        user?.uid,
        initialVenueData,
        {
          name,
          address,
          link,
        }
      );
      setUpdatedVenueData(response.venue);
      toggleVenueDataModal();
      refetch();
      navigation.navigate("Home", { venueUpdated: true });
    } else {
      showToast("You didnt change anything bozo", false, "top");
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await handleDelete(
        venueId,
        updatedVenueData?.createdByUID,
        user?.uid,
        navigation,
        deleteVenueMutation
      );

      toggleVenueDataModal();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <Modal
      isVisible={isVenueDataModalVisible}
      onBackdropPress={() => toggleVenueDataModal()}
      avoidKeyboard={true}
    >
      <View
        style={{
          backgroundColor: myColors.beige,
          paddingTop: 30,
          paddingBottom: 30,
          borderRadius: 20,
        }}
      >
        <VenueForm
          windowHeight={windowHeight}
          handleSubmit={handleUpdate}
          buttonTitle="Update"
          initialValues={initialVenueData}
        />

        <MyLongPressButton
          title="Delete Venue"
          onPress={() => showToast("Hold down to delete", false, "top")}
          onLongPress={handleDeleteVenue}
        />
      </View>
    </Modal>
  );
};

export default UpdateDataFormModal;

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
