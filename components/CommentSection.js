import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AddComment from "./AddComment";

const CommentSection = ({ venueId, userId, comments, displayName }) => {
  return (
    <View>
      {comments?.map((comment, index) => (
        <View key={index} style={styles.commentWrapper}>
          <Text>{comment?.comment}</Text>
          <Text>{comment?.userDisplayName}</Text>
        </View>
      ))}
      <AddComment venueId={venueId} userId={userId} displayName={displayName} />
    </View>
  );
};

export default CommentSection;
const styles = StyleSheet.create({
  commentWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    borderWidth: 2,
    borderColor: "green",
    paddingVertical: 10, // Add padding along the vertical axis (height)
    paddingHorizontal: 0,
  },
});
