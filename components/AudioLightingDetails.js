import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { myColors, regFont } from "../theme";
import MyTextInput from "./MyComponents/MyTextInput";
import { Picker } from "@react-native-picker/picker";
import MyButton from "./MyComponents/MyButton";
const AudioLightingDetails = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    // general
    venueType: "club",
    parking: "",
    stageSize: "",
    capicity: "",
    housePower: "",
    loadIn: "",
    // audio
    pa: "",
    micPackage: "",
    fohDesk: "",
    monDesk: "",
    monitors: "",
    // lighting
    lightingDesk: "",
    lightingPackage: "",
    greenRooms: "",
    showers: "",
    // video
    video: "",
    // rigging
    rigging: "",
  });

  const handleInputChange = (fieldName, text) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.sectionHeader, { marginBottom: -3 }]}>
        Venue Type
      </Text>
      <Picker
        selectedValue={formData.venueType}
        onValueChange={(itemValue) => handleInputChange("venueType", itemValue)}
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
        <Picker.Item label="Club" value="club" />
        <Picker.Item label="Arena" value="arena" />
        <Picker.Item label="Shed" value="shed" />
        <Picker.Item label="Festival" value="festival" />
      </Picker>

      <Text style={styles.sectionHeader}>General</Text>

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
          <Text style={styles.formText}>{formData.capiticy}</Text>
        )}
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Stage Size</Text>
        <TextInput
          // placeholder="Stage Size"
          onChangeText={(text) => handleInputChange("stageSize", text)}
          value={formData.stageSize}
          secureTextEntry={false}
          width={"80%"}
          style={styles.formTextInput}
          placeholderTextColor={"gray"}
        />
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Load in</Text>
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
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>House Power</Text>
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
      </View>

      <Text style={styles.sectionHeader}>Audio</Text>

      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>FOH Desk</Text>
        <TextInput
          // placeholder="Foh Desk"
          onChangeText={(text) => handleInputChange("fohDesk", text)}
          value={formData.fohDesk}
          secureTextEntry={false}
          width={"80%"}
          style={styles.formTextInput}
          placeholderTextColor={"gray"}
        />
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Mon Desk</Text>
        <TextInput
          // placeholder="Mon Desk"
          onChangeText={(text) => handleInputChange("monDesk", text)}
          value={formData.monDesk}
          secureTextEntry={false}
          width={"80%"}
          style={styles.formTextInput}
          placeholderTextColor={"gray"}
        />
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Monitors</Text>
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
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>PA:</Text>
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
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Mic package</Text>
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
      </View>
      <Text style={styles.sectionHeader}>Lighting</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Lighting Desk</Text>
        <TextInput
          editable
          onChangeText={(text) => handleInputChange("lightingDesk", text)}
          value={formData.lightingDesk}
          style={styles.formTextInput}
          placeholderTextColor={"gray"}
          // placeholder="Lighting Desk"
        />
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Floor package</Text>
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
      </View>
      <Text style={styles.sectionHeader}>Video</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Video</Text>
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
      </View>
      <Text style={styles.sectionHeader}>Rigging</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Rigging</Text>
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
      </View>
      <Text style={styles.sectionHeader}>Misc.</Text>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Parking</Text>
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
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Green Rooms</Text>
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
      </View>
      <View style={styles.entryWrapper}>
        <Text style={styles.listItem}>Showers</Text>
        <TextInput
          onChangeText={(text) => handleInputChange("showers", text)}
          value={formData.showers}
          style={styles.formTextInput}
          placeholderTextColor={"gray"}
          // placeholder="Showers"
        />
      </View>
      <MyButton
        title="edit"
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
    marginTop: 10,
    marginBottom: 10,
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
  listItem: { fontFamily: regFont.fontFamily, color: myColors.black },
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
