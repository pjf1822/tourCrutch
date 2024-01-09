import { View, Text, Button, FlatList } from "react-native";
import React from "react";
import MyButton from "../MyButton";
import RenderPDFItem from "../../components/RenderPDFItem";
import { myColors } from "../../theme";
import Modal from "react-native-modal";

const FilesModal = ({
  isModalVisible,
  toggleModal,
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
      isVisible={isModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={toggleModal}
      backdropOpacity={0}
    >
      <View
        style={{
          backgroundColor: "white",
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
                // backgroundColor: myColors.black,
              }}
            ></View>
          }
        />
        <MyButton title="Upload Pdf" onPress={handleUploadPdf} />
      </View>
    </Modal>
  );
};

export default FilesModal;
