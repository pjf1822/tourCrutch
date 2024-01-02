import { View, Text } from "react-native";
import React from "react";
import AddComment from "./AddComment";

const CommentSection = ({ venueId, userId, comments, displayName }) => {
  return (
    <View>
      {comments?.map((comment, index) => (
        <View key={index}>
          <Text>{comment?.comment}</Text>
          <Text>{comment?.userDisplayName}</Text>
        </View>
      ))}
      <AddComment venueId={venueId} userId={userId} displayName={displayName} />
    </View>
  );
};

export default CommentSection;
