import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { myColors, regFont } from "../theme";
import { Picker } from "@react-native-picker/picker";
import MyButton from "./MyComponents/MyButton";
const AudioLightingDetails = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    // general
    venueType: "Club",
    capicity: "345",
    stageSize: "a bsolutel enormo",
    loadIn: "back door",
    parking: "no thanks",
    housePower: "hella amps",
    // audio
    pa: "banana hang",
    micPackage: "only shotguns",
    fohDesk: "fisherprice",
    monDesk: "midas 3k",
    monitors: "MJF214",
    // lighting
    lightingDesk: "HOG",
    lightingPackage: "lampy things",
    greenRooms: "not for you",
    showers: "-1",
    // video
    video: "yes",
    // rigging
    rigging: "doggy bones everywhere",
  });

  const handleInputChange = (fieldName, text) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  return (
    <View style={styles.wrapper}>
      {editing && (
        <Text
          style={[styles.sectionHeader, { marginBottom: editing ? -3 : 10 }]}
        >
          Venue Type
        </Text>
      )}

      {editing && (
        <Picker
          selectedValue={formData.venueType}
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
          <Picker.Item label="Club" value="Club" />
          <Picker.Item label="Arena" value="Arena" />
          <Picker.Item label="Shed" value="Shed" />
          <Picker.Item label="Festival" value="Festival" />
        </Picker>
      )}

      <Text style={styles.sectionHeader}>General</Text>

      {!editing && (
        <View style={styles.entryWrapper}>
          <Text style={styles.listItem}>Venue Type</Text>
          <Text style={styles.formText}>{formData.venueType}</Text>
        </View>
      )}

      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Capacity</Text>
        {editing ? (
          <TextInput
            // placeholder="Capacity"
            onChangeText={(text) => handleInputChange("capicity", text)}
            value={formData.capicity}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.capicity}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Stage Size</Text>
        {editing ? (
          <TextInput
            // placeholder="Stage Size"
            onChangeText={(text) => handleInputChange("stageSize", text)}
            value={formData.stageSize}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.stageSize}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Load in</Text>
        {editing ? (
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={300}
            // placeholder="Load in"
            onChangeText={(text) => handleInputChange("loadIn", text)}
            value={formData.loadIn}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.loadIn}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>House Power</Text>
        {editing ? (
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={300}
            // placeholder="House Power"
            onChangeText={(text) => handleInputChange("housePower", text)}
            value={formData.housePower}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.housePower}</Text>
        )}
      </View>

      <Text style={styles.sectionHeader}>Audio</Text>

      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>FOH Desk</Text>
        {editing ? (
          <TextInput
            // placeholder="Foh Desk"
            onChangeText={(text) => handleInputChange("fohDesk", text)}
            value={formData.fohDesk}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.fohDesk}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Mon Desk</Text>
        {editing ? (
          <TextInput
            // placeholder="Mon Desk"
            onChangeText={(text) => handleInputChange("monDesk", text)}
            value={formData.monDesk}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.monDesk}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Monitors</Text>
        {editing ? (
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={300}
            // placeholder="Monitors"
            onChangeText={(text) => handleInputChange("monitors", text)}
            value={formData.monitors}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.monitors}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>PA:</Text>
        {editing ? (
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={300}
            // placeholder="PA"
            onChangeText={(text) => handleInputChange("pa", text)}
            value={formData.pa}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.pa}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Mic package</Text>
        {editing ? (
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={300}
            onChangeText={(text) => handleInputChange("micPackage", text)}
            value={formData.micPackage}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
            // placeholder="Mic Package"
          />
        ) : (
          <Text style={styles.formText}>{formData.micPackage}</Text>
        )}
      </View>
      <Text style={styles.sectionHeader}>Lighting</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Lighting Desk</Text>
        {editing ? (
          <TextInput
            editable
            onChangeText={(text) => handleInputChange("lightingDesk", text)}
            value={formData.lightingDesk}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
            // placeholder="Lighting Desk"
          />
        ) : (
          <Text style={styles.formText}>{formData.lightingDesk}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Floor package</Text>
        {editing ? (
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={300}
            onChangeText={(text) => handleInputChange("lightingPackage", text)}
            value={formData.lightingPackage}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
            // placeholder="Floor Package"
          />
        ) : (
          <Text style={styles.formText}>{formData.lightingPackage}</Text>
        )}
      </View>
      <Text style={styles.sectionHeader}>Video</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Video</Text>
        {editing ? (
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={300}
            // placeholder="Video"
            onChangeText={(text) => handleInputChange("video", text)}
            value={formData.video}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.video}</Text>
        )}
      </View>
      <Text style={styles.sectionHeader}>Rigging</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Rigging</Text>
        {editing ? (
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={300}
            // placeholder="Rigging"
            onChangeText={(text) => handleInputChange("rigging", text)}
            value={formData.rigging}
            secureTextEntry={false}
            width={"80%"}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
          />
        ) : (
          <Text style={styles.formText}>{formData.rigging}</Text>
        )}
      </View>
      <Text style={styles.sectionHeader}>Misc.</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Parking</Text>
        {editing ? (
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={300}
            onChangeText={(text) => handleInputChange("parking", text)}
            value={formData.parking}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
            // placeholder="Parking"
          />
        ) : (
          <Text style={styles.formText}>{formData.parking}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Green Rooms</Text>
        {editing ? (
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={300}
            onChangeText={(text) => handleInputChange("greenRooms", text)}
            value={formData.greenRooms}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
            // placeholder="Green Rooms"
          />
        ) : (
          <Text style={styles.formText}>{formData.greenRooms}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Showers</Text>
        {editing ? (
          <TextInput
            onChangeText={(text) => handleInputChange("showers", text)}
            value={formData.showers}
            style={styles.formTextInput}
            placeholderTextColor={"gray"}
            // placeholder="Showers"
          />
        ) : (
          <Text style={styles.formText}>{formData.showers}</Text>
        )}
      </View>
      <View style={{ height: 10 }}></View>
      <MyButton
        title={editing ? "Update" : "Edit"}
        onPress={() => {
          setEditing(!editing);
        }}
        width={"80%"}
      />
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
  },
  title: {
    fontFamily: regFont.fontFamily,
  },
  listItem: {
    fontFamily: regFont.fontFamily,
    color: myColors.black,
    fontSize: 15,
  },
  formText: {
    fontFamily: regFont.fontFamily,
    color: myColors.black,
    fontSize: 16,
  },
  formTextInput: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: myColors.white,
    padding: 10,
    flex: 1,
    maxWidth: "75%",
    fontFamily: regFont.fontFamily,
    backgroundColor: myColors.black,
    alignSelf: "center",
    color: myColors.beige,
    fontSize: 15,
  },
});
