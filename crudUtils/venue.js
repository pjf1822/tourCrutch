import { combineAddress, isValidUrl, showToast } from "../helpers";

export const createVenue = async (
  values,
  user,
  createVenueMutation,
  navigation,
  resetForm
) => {
  try {
    // if (
    //   !values?.name ||
    //   !values?.streetNameNumber ||
    //   !values.city ||
    //   !values.state ||
    //   !values.zip ||
    //   !values?.link
    // ) {
    //   showToast("Please fill out all fields", false, "top");
    //   return;
    // }
    if (!isValidUrl(values?.link)) {
      showToast("Please enter a valid URL for the Venue Link", false, "top");
      return;
    }

    // const address = combineAddress(values);
    // values.address = address;
    const result = await createVenueMutation.mutateAsync({
      ...values,
      userUID: user.uid,
    });
    showToast("Created new venue!", true, "top");
    resetForm();
    navigation.navigate("Home", { venueCreated: true });
  } catch (error) {
    showToast(error?.message, false, "top");
  }
};

export const handleUpdateVenueInfo = async (
  updateVenueInfoMutation,
  venueId,
  createdByUID,
  userUID,
  originalVenueData,
  updatedVenueData
) => {
  try {
    // if (!createdByUID || createdByUID !== userUID) {
    //   throw new Error("User does not have permission to update this venue.");
    // }

    const updatedFields = {};

    Object.keys(updatedVenueData).forEach((field) => {
      if (originalVenueData[field] !== updatedVenueData[field]) {
        updatedFields[field] = updatedVenueData[field];
      }
    });

    const response = await updateVenueInfoMutation.mutateAsync({
      id: venueId,
      updatedData: updatedFields,
    });
    if (originalVenueData?.pdfs?.length > updatedVenueData?.pdfs?.length) {
      showToast("You Deleted a file", true, "top");
    } else if (
      originalVenueData?.pdfs?.length < updatedVenueData?.pdfs?.length
    ) {
      showToast("You Added a file", true, "top");
    } else {
      showToast("You Updated the venue!", true, "top");
    }

    return response;
  } catch (error) {
    console.log(error, "what did we break");
    showToast(error?.message, false, "top");
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
    showToast(error?.message, false, "top");
  }
};
