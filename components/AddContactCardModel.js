import { View, Text, Keyboard, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import MyTextInput from "./MyComponents/MyTextInput";
import Modal from "react-native-modal";
import { myColors, regFont } from "../theme";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
import MyButton from "./MyComponents/MyButton";
import { showToast } from "../helpers";

const AddContactCardModal = ({
  isContactModalVisible,
  toggleContactModal,
  updatedVenueData,
  updateVenueInfoMutation,
  venueId,
  user,
  initialVenueData,
  setUpdatedVenueData,
}) => {
  const [card, setCard] = useState({
    name: "",
    position: "",
    email: "",
    phoneNumber: "",
  });
  const handleFieldChange = (fieldName, value) => {
    setCard((prevCard) => ({ ...prevCard, [fieldName]: value }));
  };

  const handleAddContactCard = () => {
    if (card?.name === "") {
      showToast("Please fill out the name field", false, "top");
      return;
    }
    const updatedContactCards = [...updatedVenueData.contactCards];
    updatedContactCards.push(card);

    handleUpdateVenueInfo(
      updateVenueInfoMutation,
      venueId,
      updatedVenueData?.createdByUID,
      user?.uid,
      initialVenueData,
      { contactCards: updatedContactCards }
    );
    setUpdatedVenueData((prevVenueInfo) => ({
      ...prevVenueInfo,
      contactCards: updatedContactCards,
    }));

    setCard({ name: "", position: "", email: "", phoneNumber: "" });
    toggleContactModal();
  };

  return (
    <Modal
      isVisible={isContactModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={toggleContactModal}
      avoidKeyboard={true}
    >
      <View
        style={{
          backgroundColor: myColors.beige,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: regFont.fontFamily,
            fontSize: Platform.OS === "ios" && Platform.isPad ? 26 : 20,
            textAlign: "center",
            marginBottom: 7,
          }}
        >
          Add Contact
        </Text>
        <MyTextInput
          placeholder="Name"
          onChangeText={(newName) => handleFieldChange("name", newName)}
          value={card?.name}
          secureTextEntry={false}
          width={"80%"}
        />
        <MyTextInput
          placeholder="Position"
          onChangeText={(newPosition) =>
            handleFieldChange("position", newPosition)
          }
          value={card.position}
          secureTextEntry={false}
          width={"80%"}
        />
        <MyTextInput
          placeholder="Email"
          onChangeText={(newEmail) => handleFieldChange("email", newEmail)}
          value={card?.email}
          secureTextEntry={false}
          width={"80%"}
        />
        <MyTextInput
          placeholder="Phone Number"
          onChangeText={(newPhoneNumber) =>
            handleFieldChange("phoneNumber", newPhoneNumber)
          }
          value={card?.phoneNumber}
          secureTextEntry={false}
          width={"80%"}
        />
        <MyButton
          title="Add Contact"
          onPress={handleAddContactCard}
          warning={false}
          width={"80%"}
        />
      </View>
    </Modal>
  );
};

export default AddContactCardModal;
