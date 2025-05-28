import { showToast } from "../helpers";

export const deleteCommentHandler = async (
  venueId,
  commentId,
  deleteCommentMutation,
  refetch
) => {
  try {
    const response = await deleteCommentMutation.mutateAsync({
      venueId,
      commentId,
    });

    // setAllComments((prevComments) =>
    //   prevComments.filter((comment) => comment._id !== response._id)
    // );
    showToast("Comment deleted successfully", true, "top");
    refetch();
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
};

export const addComment = async (
  addCommentMutation,
  allComments,
  setNewComment,
  setAllComments
) => {
  try {
    const response = await addCommentMutation.mutateAsync();
    const updatedComments = [...allComments, response];
    setAllComments(updatedComments);
    setNewComment("");
  } catch (error) {
    console.error("Failed to create comment:", error);
  }
};
