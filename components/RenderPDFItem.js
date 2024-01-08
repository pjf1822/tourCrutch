import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { getVenuePDF } from "../storageFunctionUtils";
import { myColors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
import { showToast } from "../helpers";

const RenderPDFItem = ({
  navigation,
  updateVenueInfoMutation,
  venueId,
  createdByUID,
  userUID,
  name,
  address,
  link,
  item,
}) => {
  const [firstPart, restPart] = item?.split("-");

  const handleLongPress = async () => {
    const result = await handleUpdateVenueInfo(
      navigation,
      updateVenueInfoMutation,
      venueId,
      createdByUID,
      userUID,
      name,
      address,
      link,
      "REMOVE"
    );
    if (result.message === "Venue updated successfully") {
      showToast("Deleted the Doc", true, "top");
    }
  };
  return (
    <TouchableOpacity
      onPress={() => getVenuePDF(venueId, item)}
      onLongPress={handleLongPress}
    >
      <Icon name="file-pdf-o" size={20} color={myColors.sand} />
      <Text style={{ color: myColors.sand, flexWrap: "wrap" }}>
        {firstPart}
      </Text>
      <Text style={{ color: myColors.sand, flexWrap: "wrap" }}>{restPart}</Text>
    </TouchableOpacity>
  );
};

export default RenderPDFItem;
