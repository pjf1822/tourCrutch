import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import CommentSection from "./CommentSection";
import { myColors, regFont } from "../theme";

const CommentsModal = ({
  isCommentsModalVisible,
  toggleCommentsModal,
  venueId,
  user,
}) => {
  return (
    <Modal
      isVisible={isCommentsModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={toggleCommentsModal}
      avoidKeyboard={true}
    >
      <View
        style={{
          backgroundColor: myColors.beige,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 7,
          borderTopColor: myColors.black,
          borderTopWidth: 8,
        }}
      >
        <CommentSection
          venueId={venueId}
          userId={user?.uid}
          displayName={user?.displayName}
        />
      </View>
    </Modal>
  );
};

export default CommentsModal;
