import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { useStorage } from "../Contexts/StorageContext";
import Smiley from "../assets/logo.png";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteComment, useFetchVenueComments } from "../api";
import { showToast } from "../helpers";

const CommentSection = ({ venueId, userId, displayName }) => {
  const { getUserProfilePic } = useStorage();
  const [userPhotos, setUserPhotos] = useState({});
  const [allComments, setAllComments] = useState([]);
  const deleteCommentMutation = deleteComment();

  const {
    data: venueCommentsData,
    error,
    isLoading,
  } = useFetchVenueComments(venueId);

  useEffect(() => {
    if (venueCommentsData && venueCommentsData.venueComments) {
      setAllComments(venueCommentsData.venueComments);
    }
  }, [venueCommentsData]);

  useEffect(() => {
    if (allComments?.length !== 0) {
      const fetchUserProfilePic = async () => {
        const photos = {};

        for (const comment of allComments) {
          const userUid = comment?.userUid;
          try {
            const userProfilePic = await getUserProfilePic(userUid);
            photos[userUid] = userProfilePic;
          } catch (error) {
            photos[userUid] = "noPic";
          }
        }

        setUserPhotos(photos);
      };

      fetchUserProfilePic();
    }
  }, [allComments]);

  const deleteCommentHandler = async (venueId, commentId) => {
    try {
      const response = await deleteCommentMutation.mutateAsync({
        venueId,
        commentId,
      });
      showToast("Comment deleted successfully", true, "top");

      console.log(response._id, "here is the id that we just deleted");
      setAllComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== response._id)
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <View>
      {allComments?.map((comment, index) => (
        <View key={index} style={styles.commentWrapper}>
          <TouchableOpacity
            onPress={() => deleteCommentHandler(venueId, comment._id)}
          >
            <Icon name="close" />
          </TouchableOpacity>
          <Text>{comment?.comment}</Text>
          <Text>{comment?.userDisplayName}</Text>
          {userPhotos[comment?.userUid] === "noPic" ? (
            <Image source={Smiley} style={styles.userPhoto} />
          ) : (
            <Image
              source={{ uri: userPhotos[comment?.userUid] }}
              style={styles.userPhoto}
            />
          )}
        </View>
      ))}
      <AddComment
        venueId={venueId}
        userId={userId}
        displayName={displayName}
        setAllComments={setAllComments}
        allComments={allComments}
      />
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
