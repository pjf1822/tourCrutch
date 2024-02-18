import { Platform, View } from "react-native";
import React, { useState } from "react";
import MyTextInput from "./MyComponents/MyTextInput";
import MyButton from "./MyComponents/MyButton";
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
        secureTextEntry={false}
        width={"90%"}
      />
      <View style={{ height: 7 }}></View>
      <MyButton
        title={"Submit Comment"}
        onPress={handleAddComment}
        warning={false}
        width={"90%"}
      />
      <View
        style={{ height: Platform.OS === "ios" && Platform.isPad ? 2 : 0 }}
      ></View>
    </View>
  );
};

export default AddComment;
