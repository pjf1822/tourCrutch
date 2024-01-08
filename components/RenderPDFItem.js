import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { getVenuePDF } from "../storageFunctionUtils";
import { myColors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
import { deleteObject, ref } from "@firebase/storage";
import { FIREBASE_STORAGE } from "../firebaseConfig";
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
  const [firstPart, restPart] = item?.split("-");

  const handleLongPress = async () => {
    const updatedPDFs = [...venueData.pdfs];
    const itemIndex = updatedPDFs.indexOf(item);
    if (itemIndex !== -1) {
      const deletedPDF = updatedPDFs.splice(itemIndex, 1)[0];
      const storageRef = ref(
        FIREBASE_STORAGE,
        `venue-info/${venueId}/${deletedPDF}`
      );
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
    >
      <Icon name="file-pdf-o" size={24} color={myColors.black} />
      <Text
        style={{
          color: myColors.black,
          fontFamily: regFont.fontFamily,
          flexWrap: "wrap",
        }}
      >
        {firstPart}
      </Text>
      <Text
        style={{
          color: myColors.black,
          fontFamily: regFont.fontFamily,
          flexWrap: "wrap",
        }}
      >
        {restPart}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderPDFItem;
