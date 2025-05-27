import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { myColors, regFont } from "../theme";
import { Picker } from "@react-native-picker/picker";
import MyButton from "./MyComponents/MyButton";
import { handleUpdateVenueInfo } from "../crudUtils/venue";
const AudioLightingDetails = ({
  updatedVenueData,
  updateVenueInfoMutation,
  venueId,
  setUpdatedVenueData,
  user,
  refetch,
}) => {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    // general
    venueType: "",
    capacity: "",
    stageSize: "",
    loadIn: "",
    parking: "",
    housePower: "",
    // audio
    pa: "",
    micPackage: "",
    fohDesk: "",
    monDesk: "",
    monitors: "",
    // lighting
    lightingDesk: "",
    lightingPackage: "",
    // video
    video: "",
    // rigging
    rigging: "",
    // misc
    merch: "",
    runner: "",
    shorePower: "",
    greenRooms: "",
    showers: "",
    moreInfo: "",
  });

  const resetFormData = () => {
    setFormData(updatedVenueData.productionInfo);
  };

  useEffect(() => {
    resetFormData();
    setEditing(false);
  }, [updatedVenueData]);

  const handleInputChange = (fieldName, text) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  const handleUpdate = async () => {
    const response = await handleUpdateVenueInfo(
      updateVenueInfoMutation,
      venueId,
      updatedVenueData?.createdByUID,
      user?.uid,
      updatedVenueData,
      {
        productionInfo: formData,
      }
    );
    refetch();
    // navigation.navigate("Home", { venueUpdated: true });
    // setUpdatedVenueData(response.venue);
  };
  // this is used strictly for order
  const fieldOrder = [
    "venueType",
    "capacity",
    "stageSize",
    "loadIn",
    "parking",
    "housePower",
    "pa",
    "micPackage",
    "fohDesk",
    "monDesk",
    "monitors",
    "lightingDesk",
    "lightingPackage",
    "video",
    "rigging",
    "merch",
    "runner",
    "shorePower",
    "greenRooms",
    "showers",
    "moreInfo",
  ];

  return (
    <View style={styles.wrapper}>
      {/*  */}
      {/* First entry is a picker so theres an extra space for it */}
      {/*  */}
      {editing && (
        <Text
          style={[styles.sectionHeader, { marginBottom: editing ? -3 : 10 }]}
        >
          Venue Type
        </Text>
      )}

      {editing && (
        <Picker
          selectedValue={formData?.venueType}
          onValueChange={(itemValue) =>
            handleInputChange("venueType", itemValue)
          }
          itemStyle={{
            fontFamily: regFont.fontFamily,
            fontSize: 18,
            width: "80%",
            backgroundColor: myColors.beige,
            alignSelf: "center",
            height: 100,
            borderRadius: 10,
          }}
        >
          <Picker.Item label="" value="" />
          <Picker.Item label="Club" value="Club" />
          <Picker.Item label="Arena" value="Arena" />
          <Picker.Item label="Shed" value="Shed" />
          <Picker.Item label="Festival" value="Festival" />
        </Picker>
      )}

      <Text style={styles.sectionHeader}>General</Text>

      {!editing && (
        <View
          style={[styles.entryWrapper, { borderBottomWidth: editing ? 0 : 3 }]}
        >
          <Text style={[styles.listItem, { fontSize: editing ? 15 : 17 }]}>
            Venue Type
          </Text>
          <Text style={styles.formText}>{formData?.venueType || "---"}</Text>
        </View>
      )}
      {/*  */}
      {/* actual list begins*/}
      {/*  */}

      {fieldOrder.map((fieldName, index) => {
        const value = formData[fieldName];
        const formattedFieldName = fieldName
          .replace(/([A-Z])/g, " $1")
          .trim()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        if (index === 0) {
          return null; // Skip rendering the first entry
        }

        const headers = {
          pa: "Audio",
          lightingDesk: "Lighting",
          video: "Video",
          rigging: "Rigging",
          merch: "Misc",
        };
        return (
          <View
            key={fieldName}
            style={[
              styles.entryWrapper,
              { borderBottomWidth: editing ? 0 : 3 },
              { paddingBottom: editing ? 0 : 3 },
            ]}
          >
            <View style={{ width: "100%" }}>
              {headers[fieldName] && (
                <Text style={styles.sectionHeader}>{headers[fieldName]}</Text>
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[styles.listItem, { fontSize: editing ? 15 : 17 }]}
                >
                  {formattedFieldName}
                </Text>

                {editing ? (
                  <TextInput
                    multiline={
                      fieldName === "lightingPackage" ||
                      fieldName === "loadIn" ||
                      fieldName === "parking" ||
                      fieldName === "housePower" ||
                      fieldName === "pa" ||
                      fieldName === "micPackage" ||
                      fieldName === "monitors" ||
                      fieldName === "video" ||
                      fieldName === "rigging" ||
                      fieldName === "merch" ||
                      fieldName === "moreInfo"
                        ? true
                        : false
                    }
                    numberOfLines={15}
                    maxLength={
                      fieldName === "lightingPackage" ||
                      fieldName === "loadIn" ||
                      fieldName === "parking" ||
                      fieldName === "housePower" ||
                      fieldName === "pa" ||
                      fieldName === "micPackage" ||
                      fieldName === "monitors" ||
                      fieldName === "video" ||
                      fieldName === "rigging" ||
                      fieldName === "merch" ||
                      fieldName === "moreInfo"
                        ? 1000
                        : 100
                    }
                    onChangeText={(text) => handleInputChange(fieldName, text)}
                    value={value}
                    style={styles.formTextInput}
                    placeholderTextColor={"gray"}
                  />
                ) : (
                  <Text style={[styles.formText, { flexShrink: 1 }]}>
                    {value ? value : "---"}
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      })}
      <View style={{ height: 10 }}></View>
      <MyButton
        title={editing ? "Update" : "Edit"}
        onPress={() => {
          if (editing) {
            handleUpdate();
          }
          setEditing(!editing);
        }}
        width={"80%"}
      />
      <View style={{ height: 10 }}></View>

      {editing && (
        <MyButton
          title={"Cancel"}
          onPress={() => {
            resetFormData();
            setEditing(!editing);
          }}
          width={"80%"}
        />
      )}
    </View>
  );
};

export default AudioLightingDetails;

const styles = StyleSheet.create({
  wrapper: {
    borderColors: myColors.black,
    backgroundColor: myColors.beige,
    borderRadius: 10,
    width: "100%",
    display: "flex",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
  },
  sectionHeader: {
    fontSize: 24,
    fontFamily: regFont.fontFamily,
    textAlign: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  entryWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    borderColor: "rgba(203,114,89,0.2)",
    marginBottom: 14,
  },

  title: {
    fontFamily: regFont.fontFamily,
  },
  listItem: {
    fontFamily: regFont.fontFamily,
    color: myColors.black,
    maxWidth: "20%",
  },
  formText: {
    fontFamily: regFont.fontFamily,
    color: myColors.black,
    fontSize: 16,
    width: "70%",
    textAlign: "left",
  },
  formTextInput: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: myColors.white,
    padding: 10,
    flex: 1,
    maxWidth: "73%",
    fontFamily: regFont.fontFamily,
    backgroundColor: myColors.black,
    alignSelf: "center",
    color: myColors.beige,
    fontSize: 15,
  },
});
