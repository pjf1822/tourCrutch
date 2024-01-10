import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyButton";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";
import { myColors, regFont, upperMargin } from "../theme";
import Modal from "react-native-modal";
import MyLongPressButton from "./MyLongPressButton";

const UpdateDataFormModal = ({
  isVenueDataModalVisible,
  toggleVenueDataModal,
  venueInfo,
  setVenueInfo,
  updateVenueInfoMutation,
  venueId,
  user,
  venueData,
  handleDelete,
  navigation,
  deleteVenueMutation,
}) => {
  return (
    <Modal
      isVisible={isVenueDataModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={toggleVenueDataModal}
      backdropOpacity={0}
    >
      <View
        style={{
          backgroundColor: myColors.beige,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}
      >
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
          title="Update venue info"
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
        <View style={{ height: 60 }}></View>
        <MyLongPressButton
          title="Delete Venue"
          onPress={() => showToast("Hold down to delete", false, "top")}
          onLongPress={() =>
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
