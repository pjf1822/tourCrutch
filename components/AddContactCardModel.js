import { View, Text, Keyboard, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyBottomRowButton";
import Modal from "react-native-modal";
import { myColors, regFont } from "../theme";
import { handleUpdateVenueInfo } from "../crudUtils/venue";

const AddContactCardModal = ({
  isContactModalVisible,
  toggleContactModal,
  venueInfo,
  updateVenueInfoMutation,
  venueId,
  user,
  venueData,
  setVenueInfo,
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
    const updatedContactCards = [...venueInfo.contactCards];
    updatedContactCards.push(card);

    handleUpdateVenueInfo(
      updateVenueInfoMutation,
      venueId,
      venueInfo?.createdByUID,
      user?.uid,
      venueData,
      { contactCards: updatedContactCards }
    );
    setVenueInfo((prevVenueInfo) => ({
      ...prevVenueInfo,
      contactCards: updatedContactCards,
    }));

    setCard({ name: "", position: "", email: "", phoneNumber: "" });
    toggleContactModal();
  };

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
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
  const modalPosition = Platform.OS === "ios" ? { bottom: keyboardHeight } : {};

  return (
    <Modal
      isVisible={isContactModalVisible}
      style={[{ justifyContent: "flex-end", margin: 0 }, modalPosition]}
      onBackdropPress={toggleContactModal}
      backdropOpacity={0}
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
            fontSize: 20,
            textAlign: "center",
            marginBottom: 7,
          }}
        >
          Add Contact
        </Text>
        <MyTextInput
          value={card.name}
          onChangeText={(newName) => handleFieldChange("name", newName)}
          placeholder="Name"
        />
        <MyTextInput
          value={card.position}
          onChangeText={(newPosition) =>
            handleFieldChange("position", newPosition)
          }
          placeholder="Position"
        />
        <MyTextInput
          value={card.email}
          onChangeText={(newEmail) => handleFieldChange("email", newEmail)}
          placeholder="Email"
        />
        <MyTextInput
          value={card.phoneNumber}
          onChangeText={(newPhoneNumber) =>
            handleFieldChange("phoneNumber", newPhoneNumber)
          }
          placeholder="Phone Number"
        />
        <MyButton title="Add Contact" onPress={handleAddContactCard} />
      </View>
    </Modal>
  );
};

export default AddContactCardModal;
