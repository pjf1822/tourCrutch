import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import Smiley from "../assets/logo.png";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteComment, useFetchVenueComments } from "../api";
import { deleteCommentHandler } from "../crudUtils/comment";
import { myColors, regFont } from "../theme";
import { showToast } from "../helpers";
import { useStorage } from "../Contexts/StorageContext";

const CommentSection = ({ venueId, userId, displayName }) => {
  const { getUserProfilePic } = useStorage();
  const [userPhotos, setUserPhotos] = useState({});
  const deleteCommentMutation = deleteComment();

  const {
    data: allComments = [],
    error,
    isLoading,
    refetch,
  } = useFetchVenueComments(venueId);

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
  return (
    <View>
      <ScrollView>
        {allComments?.map((comment, index) => (
          <View key={index} style={styles.commentWrapper}>
            {userId === comment?.userUid && (
              <TouchableOpacity
                onPress={() =>
                  showToast("Hold down to delete comment", false, "top")
                }
                onLongPress={() =>
                  deleteCommentHandler(
                    venueId,
                    comment.id,
                    deleteCommentMutation,
                    refetch
                  )
                }
              >
                <Icon size={17} name="close" />
              </TouchableOpacity>
            )}

            <Text style={styles.commentText}>{comment?.comment}</Text>
            <View
              style={{
                marginLeft: 9,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text style={styles.usernameText}>
                {comment?.userDisplayName}
              </Text>

              <Image
                source={
                  userPhotos[comment?.userUid] === "noPic"
                    ? Smiley
                    : { uri: userPhotos[comment?.userUid] }
                }
                style={styles.userPhoto}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <AddComment
        venueId={venueId}
        userId={userId}
        displayName={displayName}
        refetchComments={refetch}
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
    padding: Platform.OS === "ios" && Platform.isPad ? 7 : 3,
    marginBottom: 10,
  },
  commentText: {
    fontFamily: regFont.fontFamily,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flex: 4,
    marginLeft: 5,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 22 : 15,
  },
  usernameText: {
    fontFamily: regFont.fontFamily,
    display: "flex",
    textAlign: "left",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 5,
    marginRight: Platform.OS === "ios" && Platform.isPad ? 14 : 5,
    fontSize: Platform.OS === "ios" && Platform.isPad ? 22 : 15,
  },
  userPhoto: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
});
