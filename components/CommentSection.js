import { View, Text } from "react-native";
import React from "react";
import { comments } from "../dataModels";
import AddComment from "./AddComment";

const CommentSection = ({ venueId }) => {
  const filteredComments = comments.filter(
    (comment) => comment.venueId === venueId
  );

  return (
    <View>
      {filteredComments.map((comment, index) => (
        <View key={index}>
          <Text>{comment?.comment}</Text>
          <Text>{comment?.userId}</Text>
        </View>
      ))}
      <AddComment />
    </View>
  );
};

export default CommentSection;
