import { Platform, Text, TouchableOpacity } from "react-native";
import React from "react";
import { myColors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
import { deleteObject, ref } from "@firebase/storage";
import { storage } from "../firebaseConfig";
import { regFont } from "../theme";
import { getVenuePDF } from "../functionUtils/storageFunctionUtils";

const RenderPDFItem = ({
  updateVenueInfoMutation,
  venueId,
  createdByUID,
  userUID,
  initialVenueData,
  item,
  setUpdatedVenueData,
}) => {
  const handleLongPress = async () => {
    return;
    const updatedPDFs = [...initialVenueData.pdfs];
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
      initialVenueData,
      { pdfs: updatedPDFs }
    );
    setUpdatedVenueData(result.venue);
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
      <Icon
        name="file-pdf-o"
        size={Platform.OS === "ios" && Platform.isPad ? 50 : 30}
        color={myColors.black}
      />
      <Text
        style={{
          color: myColors.black,
          fontFamily: regFont.fontFamily,
          flexWrap: "wrap",
          paddingTop: 9,
          paddingBottom: 5,
          fontSize: Platform.OS === "ios" && Platform.isPad ? 29 : 17,
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderPDFItem;
