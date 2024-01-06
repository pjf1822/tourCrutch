import { isValidUrl, showToast } from "../helpers";

export const createVenue = async (
  values,
  user,
  createVenueMutation,
  navigation,
  resetForm
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
    resetForm();
    navigation.navigate("Home", { venueCreated: true });
  } catch (error) {
    showToast(error.message, false, "top");
  }
};

export const handleUpdateVenueInfo = async (
  navigation,
  updateVenueInfoMutation,
  venueId,
  createdByUID,
  userUID,
  venueName,
  venueAddress,
  venueLink,
  newPDF
) => {
  try {
    if (!createdByUID) {
      throw new Error("Venue createdByUID not found. Unable to update venue.");
    }
    if (createdByUID !== userUID) {
      showToast(
        "User does not have permission to update this venue!",
        false,
        "top"
      );

      throw new Error("User does not have permission to update this venue.");
    }

    const response = await updateVenueInfoMutation.mutateAsync({
      id: venueId,
      updatedData: {
        name: venueName,
        address: venueAddress,
        link: venueLink,
        newPDF: newPDF,
      },
    });

    showToast("You Updated the venue!", true, "top");
    // navigation.navigate("Home", { venueUpdated: true });   do we really need this?
  } catch (error) {
    console.log(error, "what did we break");
    showToast(error.message, false, "top");
  }
};

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
    showToast(error.message, false, "top");
  }
};
