import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { getVenuePDF } from "../storageFunctionUtils";
import { myColors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";

const RenderPDFItem = ({ venueId, item }) => {
  const [firstPart, restPart] = item.split("-");

  return (
    <TouchableOpacity
      onPress={() => getVenuePDF(venueId, item)}
      onLongPress={() => console.log("fuck")}
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
