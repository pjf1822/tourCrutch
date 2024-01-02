import { isValidUrl, showToast } from "../helpers";

export const handleDelete = async (
  venueId,
  createdByUID,
  userUID,
  navigation,
  deleteVenueMutation
) => {
  try {
    if (!createdByUID) {
      throw new Error("Venue createdByUID not found. Unable to delete venue.");
    }
    if (createdByUID !== userUID) {
      showToast(
        "User does not have permission to delete this venue!",
        false,
        "top"
      );

      throw new Error("User does not have permission to delete this venue.");
    }

    const result = await deleteVenueMutation.mutateAsync(venueId);
    showToast("Venue deleted!", true, "top");

    navigation.navigate("Home", { venueDeleted: true, venueId: venueId });
  } catch (error) {
    showToast("Venue could not be  deleted!", false, "top");

    console.error("Failed to delete venue:", error);
  }
};

export const createVenue = async (
  values,
  user,
  createVenueMutation,
  navigation
) => {
  try {
    if (!values?.name || !values?.address || !values?.link) {
      showToast("Please fill out all fields", false, "top");
      return;
    }

    if (!isValidUrl(values.link)) {
      showToast("Please enter a valid URL for the Venue Link", false, "top");
      return;
    }
    const result = await createVenueMutation.mutateAsync({
      ...values,
      userUID: user.uid,
    });
    showToast("Created new venue!", true, "top");
    navigation.navigate("Home", { venueCreated: true });
  } catch (error) {
    showToast("Could not create new venue", false, "top");

    console.error("Failed to create venue:", error);
  }
};

export const handleUpdateVenueInfo = async (
  navigation,
  updateVenueInfoMutation,
  id,
  venueName,
  venueAddress,
  venueLink
) => {
  try {
    const response = await updateVenueInfoMutation.mutateAsync({
      id: id,
      updatedData: {
        name: venueName,
        address: venueAddress,
        link: venueLink,
      },
    });

    if (response.message === "Venue updated successfully") {
      showToast("You Updated the venue!", true, "top");
      navigation.navigate("Home", { venueUpdated: true });
    } else {
      showToast("Failed to update venue", false, "top");
    }
  } catch (error) {
    console.error("Error updating venue:", error);
    showToast("An error occurred while updating the venue", false, "top");
  }
};
