import { View } from "react-native";
import React, { useState } from "react";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyButton";
import { createComment } from "../api";
import { addComment } from "../crudUtils/comment";

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

  return (
    <View>
      <MyTextInput
        placeholder="Add a comment"
        onChangeText={(text) => setNewComment(text)}
        value={newComment}
      />
      <MyButton
        title={"Submitm Cooment"}
        onPress={() =>
          addComment(
            addCommentMutation,
            allComments,
            setNewComment,
            setAllComments
          )
        }
      />
    </View>
  );
};

export default AddComment;
