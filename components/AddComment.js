import { View } from "react-native";
import React, { useState } from "react";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyButton";
import { createComment } from "../api";
import { addComment } from "../crudUtils/comment";
import { showToast } from "../helpers";

const AddComment = ({
  venueId,
  userId,
  displayName,
  setAllComments,
  allComments,
}) => {
  const [newComment, setNewComment] = useState("");

  const addCommentMutation = createComment(venueId, {
    userUid: userId,
    comment: newComment,
    userDisplayName: displayName,
  });

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      showToast("Youre comment cant be blank", false, "top");
    } else {
      addComment(
        addCommentMutation,
        allComments,
        setNewComment,
        setAllComments
      );
    }
  };

  return (
    <View>
      <MyTextInput
        placeholder="Add a comment"
        onChangeText={(text) => setNewComment(text)}
        value={newComment}
      />
      <MyButton title={"Submitm Cooment"} onPress={handleAddComment} />
    </View>
  );
};

export default AddComment;
