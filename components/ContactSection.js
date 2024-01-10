import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import ContactCard from "./ContactCard";

const ContactSection = ({ venueInfo }) => {
  const renderItem = ({ item }) => <ContactCard data={item} />;

  return (
    <View style={styles.app}>
      <FlatList
        data={venueInfo.contactCards}
        numColumns={1}
        horizontal={true}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
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
