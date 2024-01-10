import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { useStorage } from "../Contexts/StorageContext";
import Smiley from "../assets/logo.png";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteComment, useFetchVenueComments } from "../api";
import { deleteCommentHandler } from "../crudUtils/comment";
import { myColors, regFont } from "../theme";

const CommentSection = ({ venueId, userId, displayName }) => {
  const { getUserProfilePic } = useStorage();
  const [userPhotos, setUserPhotos] = useState({});
  const [allComments, setAllComments] = useState([]);
  const deleteCommentMutation = deleteComment();
  const [arePicsLoading, setArePicsLoading] = useState(true);

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
        setArePicsLoading(false);
      };

      fetchUserProfilePic();
    }
  }, [allComments]);

  return (
    <View>
      {allComments?.map((comment, index) => (
        <View key={index} style={styles.commentWrapper}>
          <TouchableOpacity
            onPress={() =>
              deleteCommentHandler(
                venueId,
                comment._id,
                deleteCommentMutation,
                setAllComments
              )
            }
          >
            <Icon name="close" />
          </TouchableOpacity>
          <Text style={styles.commentText}>{comment?.comment}</Text>
          <Text style={styles.commentText}>{comment?.userDisplayName}</Text>
          {userPhotos[comment?.userUid] === "noPic" ? (
            <Image source={Smiley} style={styles.userPhoto} />
          ) : (
            <>
              {arePicsLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Image
                  source={{ uri: userPhotos[comment?.userUid] }}
                  style={styles.userPhoto}
                />
              )}
            </>
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
    alignItems: "center",
    borderWidth: 2,
    borderColor: myColors.black,
    borderRadius: 10,
    padding: 3,
  },
  commentText: {
    fontFamily: regFont.fontFamily,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "65%",
  },
  userPhoto: { height: 40, width: 40, borderRadius: 25 },
});
