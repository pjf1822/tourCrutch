import { Platform, View } from "react-native";
import React, { useState } from "react";
import MyTextInput from "./MyComponents/MyTextInput";
import MyButton from "./MyComponents/MyButton";
import { showToast } from "../helpers";
import { addComment } from "../api";

const AddComment = ({
  venueId,
  userId,
  displayName,
  // setAllComments,
  refetchComments,
  allComments,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      showToast("Youre comment cant be blank", false, "top");
    } else {
      const response = await addComment(
        venueId,
        userId,
        displayName,
        newComment
      );
      const updatedComments = [...allComments, response];
      // setAllComments(updatedComments);
      refetchComments();
      setNewComment("");
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
