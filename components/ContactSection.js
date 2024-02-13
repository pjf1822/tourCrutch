import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import ContactCard from "./ContactCard";
import { handleUpdateVenueInfo } from "../crudUtils/venue";

const ContactSection = ({
  venueInfo,
  updateVenueInfoMutation,
  venueId,
  user,
  venueData,
  setVenueInfo,
}) => {
  console.log(venueInfo, "the venue info");
  const renderItem = ({ item }) => (
    <ContactCard
      data={item}
      handleDeleteContactCard={handleDeleteContactCard}
    />
  );

  const handleDeleteContactCard = (contactCardId) => {
    const updatedContactCards = venueInfo?.contactCards.filter(
      (card) => card?._id !== contactCardId
    );

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
  };

  return (
    <View style={styles.app}>
      <FlatList
        data={venueInfo?.contactCards}
        numColumns={1}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
        contentContainerStyle={{
          justifyContent: "center",
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ContactSection;

const styles = StyleSheet.create({
  app: { marginTop: 10 },
});
