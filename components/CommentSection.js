import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import AddComment from "./AddComment";

const CommentSection = ({
  venueId,
  userId,
  comments,
  displayName,
  userPhoto,
}) => {
  return (
    <View>
      {comments?.map((comment, index) => (
        <View key={index} style={styles.commentWrapper}>
          <Text>{comment?.comment}</Text>
          <Text>{comment?.userDisplayName}</Text>
          <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
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
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  userPhoto: { height: 40, width: 40, borderRadius: 25 },
});
