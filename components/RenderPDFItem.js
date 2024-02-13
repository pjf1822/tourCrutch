import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { getVenuePDF } from "../storageFunctionUtils";
import { myColors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
import { deleteObject, ref } from "@firebase/storage";
import { storage } from "../firebaseConfig";
import { regFont } from "../theme";

const RenderPDFItem = ({
  updateVenueInfoMutation,
  venueId,
  createdByUID,
  userUID,
  venueData,
  item,
  setVenueInfo,
}) => {
  const handleLongPress = async () => {
    const updatedPDFs = [...venueData.pdfs];
    const itemIndex = updatedPDFs.indexOf(item);
    if (itemIndex !== -1) {
      const deletedPDF = updatedPDFs.splice(itemIndex, 1)[0];
      const storageRef = ref(storage, `venue-info/${venueId}/${deletedPDF}`);
      try {
        await deleteObject(storageRef);
      } catch (error) {
        console.error("Error deleting file from Firebase Storage:", error);
        throw new Error("Couldnt delete file");
      }
    }

    const result = await handleUpdateVenueInfo(
      updateVenueInfoMutation,
      venueId,
      createdByUID,
      userUID,
      venueData,
      { ...venueData, pdfs: updatedPDFs }
    );
    setVenueInfo(result.venue);
  };
  return (
    <TouchableOpacity
      onPress={() => getVenuePDF(venueId, item)}
      onLongPress={handleLongPress}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Icon name="file-pdf-o" size={40} color={myColors.black} />
      <Text
        style={{
          color: myColors.black,
          fontFamily: regFont.fontFamily,
          flexWrap: "wrap",
          paddingTop: 9,
          paddingBottom: 5,
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderPDFItem;
