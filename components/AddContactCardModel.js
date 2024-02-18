import { View, Text, Keyboard, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import MyTextInput from "./MyComponents/MyTextInput";
import Modal from "react-native-modal";
import { myColors, regFont } from "../theme";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
import MyButton from "./MyComponents/MyButton";

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
