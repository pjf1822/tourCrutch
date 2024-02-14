import { View, StyleSheet, Platform, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";

import { handleDelete, handleUpdateVenueInfo } from "../crudUtils/venue";
import { combineAddress, showToast, transformVenueData } from "../helpers";
import { myColors, regFont } from "../theme";
import Modal from "react-native-modal";
import MyLongPressButton from "./MyComponents/MyLongPressButton";
import VenueForm from "./VenueForm";

const UpdateDataFormModal = ({
  isVenueDataModalVisible,
  toggleVenueDataModal,
  venueInfo,
  updateVenueInfoMutation,
  venueId,
  user,
  venueData,
  navigation,
  deleteVenueMutation,
  windowHeight,
  setVenueInfo,
}) => {
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
    Platform.OS === "ios" ? { marginBottom: keyboardHeight } : {};

  const handleUpdate = async (values) => {
    // Recombine Address
    const newAddress = combineAddress(values);
    values.address = newAddress;

    const { name, address, link } = values;

    if (
      // Did the fields actually change
      name !== venueData?.name ||
      address !== venueData?.address ||
      link !== venueData?.link
    ) {
      const response = await handleUpdateVenueInfo(
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

      setVenueInfo(response.venue);

      toggleVenueDataModal();
    } else {
      showToast("You didnt change anything bozo", false, "top");
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await handleDelete(
        venueId,
        venueInfo?.createdByUID,
        user?.uid,
        navigation,
        deleteVenueMutation
      );

      toggleVenueDataModal();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const transformedData = transformVenueData(venueData);

  return (
    <Modal
      isVisible={isVenueDataModalVisible}
      style={[{ justifyContent: "flex-end", margin: 0 }, modalPosition]}
      onBackdropPress={toggleVenueDataModal}
      backdropOpacity={0}
    >
      <View
        style={{
          backgroundColor: myColors.beige,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          borderTopWidth: 10,
          borderTopColor: myColors.black,
        }}
      >
        <VenueForm
          windowHeight={windowHeight}
          handleSubmit={handleUpdate}
          buttonTitle="Update"
          initialValues={transformedData}
          formStyles={{}}
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
