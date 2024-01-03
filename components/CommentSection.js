import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { useStorage } from "../Contexts/StorageContext";

import Smiley from "../assets/logo.png"; // Import the actual image source
const CommentSection = ({ venueId, userId, comments, displayName }) => {
  const [userPhotos, setUserPhotos] = useState({});
  const { getUserProfilePic } = useStorage();

  const fetchUserProfilePic = async () => {
    const photos = {};

    // Loop through comments and fetch user profile pics
    for (const comment of comments) {
      const userUid = comment?.userUid;

      try {
        const userProfilePic = await getUserProfilePic(userUid);
        photos[userUid] = userProfilePic;
      } catch (error) {
        console.error(`Error fetching profile pic for user ${userUid}:`, error);
        photos[userUid] = "noPic";
      }
    }
    setUserPhotos(photos);
  };

  // Call the function when needed
  useEffect(() => {
    fetchUserProfilePic();
  }, []);

  return (
    <View>
      {comments?.map((comment, index) => (
        <View key={index} style={styles.commentWrapper}>
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
      <AddComment venueId={venueId} userId={userId} displayName={displayName} />
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
