import { isValidUrl, showToast } from "../helpers";
import { GOOGLE_MAP_KEY } from "@env";

export const createVenue = async (
  values,
  user,
  createVenueMutation,
  navigation,
  resetForm
) => {
  try {
    if (!values?.name) {
      showToast("Please fill out the name field", false, "top");
      return;
    }

    if (!values?.address) {
      showToast("Please select an address from the dropdown", false, "top");
      return;
    }

    if (values?.link) {
      const validatedUrl = isValidUrl(values.link);
      if (validatedUrl === "notURL") {
        showToast("Please enter a valid URL for the venue link", false, "top");
        return;
      }
      values.link = validatedUrl;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        values.address
      )}&key=${GOOGLE_MAP_KEY}`
    );

    const json = await response.json();

    if (json.status === "OK") {
      const latitude = json.results[0].geometry.location.lat;
      const longitude = json.results[0].geometry.location.lng;
      values.coordinates = {
        latitude,
        longitude,
      };
    }

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
