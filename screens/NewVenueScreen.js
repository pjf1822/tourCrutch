import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import React from "react";
import { useUser } from "../Contexts/UserContext";
import VenueForm from "../components/VenueForm";

const NewVenueScreen = ({ navigation }) => {
  const { user } = useUser();
  const windowHeight = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={require("../assets/crowd.jpg")}
      style={[styles.pageWrapper]}
      imageStyle={{ opacity: 0.6 }}
    >
      <VenueForm
        user={user}
        windowHeight={windowHeight}
        navigation={navigation}
      />
    </ImageBackground>
  );
};

export default NewVenueScreen;

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "black",
  },
});
