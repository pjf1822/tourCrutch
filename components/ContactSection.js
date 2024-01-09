import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import ContactCard from "./ContactCard";

const mockPeeps = [
  {
    name: "Billy Bobby",
    title: "Production Manager",
    number: "+1 18298349823",
    email: "bigboy@gmail.fuck",
  },
  {
    name: "Sandra Smith",
    title: "Marketing Coordinator",
    number: "+1 9876543210",
    email: "sandra.smith@email.com",
  },
  {
    name: "John Doe",
    title: "Software Engineer",
    number: "+1 1234567890",
    email: "john.doe@example.com",
  },
  {
    name: "Alice Johnson",
    title: "Graphic Designer",
    number: "+1 5555555555",
    email: "alice.johnson@gmail.com",
  },
  // Add more entries as needed
];

const ContactSection = () => {
  const renderItem = ({ item }) => <ContactCard data={item} />;

  return (
    <View style={styles.app}>
      {/* {mockPeeps?.map((card, i) => (
        <ContactCard key={i} data={card} />
      ))} */}
      <FlatList
        data={mockPeeps}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{
          //   alignItems: "center", // Center items horizontallyj
          justifyContent: "center",
        }}
      />
    </View>
  );
};

export default ContactSection;

const styles = StyleSheet.create({
  app: {
    // flex: 1,

    backgroundColor: "green",
    justifyContent: "center",
  },
});
