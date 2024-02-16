import { View, Text, FlatList, Platform, StyleSheet } from "react-native";
import React from "react";
import MyButton from "./MyComponents/MyButton";
import RenderPDFItem from "../components/RenderPDFItem";

import Modal from "react-native-modal";
import { myColors, regFont } from "../theme";

const FilesModal = ({
  isPDFModalVisible,
  togglePDFModal,
  updatedVenueData,
  updateVenueInfoMutation,
  venueId,
  user,
  setUpdatedVenueData,
  initialVenueData,
  handleUploadPdf,
  PDFUploadProgress,
}) => {
  console.log(updatedVenueData, "the stuff");
  return (
    <Modal
      isVisible={isPDFModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={togglePDFModal}
      backdropOpacity={0}
    >
      <View
        style={{
          backgroundColor: myColors.beige,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}
      >
        <FlatList
          data={updatedVenueData?.pdfs}
          renderItem={({ item }) => (
            <RenderPDFItem
              updateVenueInfoMutation={updateVenueInfoMutation}
              venueId={venueId}
              createdByUID={updatedVenueData?.createdByUID}
              userUID={user?.uid}
              initialVenueData={initialVenueData}
              item={item}
              setUpdatedVenueData={setUpdatedVenueData}
            />
          )}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={
            <View
              style={{
                width: 1,
                marginLeft: 10,
                marginRight: 10,
              }}
            ></View>
          }
        />
        {PDFUploadProgress !== 100 && (
          <View
            style={{
              backgroundColor: myColors.beige,
              width: 200,
              height: 8,
              borderRadius: 1,
              alignSelf: "center",
              marginBottom: 5,
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${PDFUploadProgress}%`,
                backgroundColor: "green",
                borderRadius: 70,
              }}
            ></View>
          </View>
        )}
        {updatedVenueData?.pdfs?.length === 0 && (
          <Text style={styles.textStyle}>There are no files yet</Text>
        )}
        <View></View>

        <MyButton title="Upload Pdf" onPress={handleUploadPdf} />
      </View>
    </Modal>
  );
};

export default FilesModal;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: regFont.fontFamily,
    color: myColors.black,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 24 : 17,
    paddingBottom: 10,
    textAlign: "center",
    marginTop: -15,
  },
});
