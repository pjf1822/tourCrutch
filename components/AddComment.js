import { View } from "react-native";
import React, { useState } from "react";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyButton";
import { createComment } from "../api";

const AddComment = ({ venueId, userId, displayName, setAllComments }) => {
  const [newComment, setNewComment] = useState("");

  const addCommentMutation = createComment(venueId, {
    userUid: userId,
    comment: newComment,
    userDisplayName: displayName,
  });

  const addComment = async () => {
    try {
      const response = await addCommentMutation.mutateAsync();
      setAllComments(response?.comments);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };
  return (
    <View>
      <MyTextInput
        placeholder="Add a comment"
        onChangeText={(text) => setNewComment(text)}
        value={newComment}
      />
      <MyButton title={"Submitm Cooment"} onPress={addComment} />
    </View>
  );
};

export default AddComment;
