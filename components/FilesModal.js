import { View, Text, Button, FlatList } from "react-native";
import React from "react";
import MyButton from "./MyButton";
import RenderPDFItem from "../components/RenderPDFItem";

import Modal from "react-native-modal";
import { myColors, regFont } from "../theme";

const FilesModal = ({
  isPDFModalVisible,
  togglePDFModal,
  venueInfo,
  updateVenueInfoMutation,
  venueId,
  user,
  setVenueInfo,
  venueData,
  handleUploadPdf,
}) => {
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
          height: "27%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}
      >
        <FlatList
          data={venueInfo?.pdfs}
          renderItem={({ item }) => (
            <RenderPDFItem
              updateVenueInfoMutation={updateVenueInfoMutation}
              venueId={venueId}
              createdByUID={venueInfo?.createdByUID}
              userUID={user?.uid}
              venueData={venueData}
              item={item}
              setVenueInfo={setVenueInfo}
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
        <Text
          style={{
            fontFamily: regFont.fontFamily,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Coming Soon
        </Text>
        {/* <MyButton title="Upload Pdf" onPress={handleUploadPdf} /> */}
      </View>
    </Modal>
  );
};

export default FilesModal;
