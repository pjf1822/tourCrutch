import { showToast } from "../helpers";

export const deleteCommentHandler = async (
  venueId,
  commentId,
  deleteCommentMutation,
  setAllComments
) => {
  try {
    const response = await deleteCommentMutation.mutateAsync({
      venueId,
      commentId,
    });

    setAllComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== response._id)
    );
    showToast("Comment deleted successfully", true, "top");
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
};
