import { View } from "react-native";
import React, { useState } from "react";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyButton";

const AddComment = () => {
  const [newComment, setNewComment] = useState("");
  return (
    <View>
      <MyTextInput
        placeholder="Add a comment"
        onChangeText={(text) => setNewComment(text)}
        value={newComment}
      />
      <MyButton title={"Submitm Cooment"} onPress={() => console.log("hey")} />
    </View>
  );
};

export default AddComment;
