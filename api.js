const url = "http://localhost:8000";

export const fetchVenues = async () => {
  try {
    const res = await fetch(`http://localhost:8000/api/venues/getallvenues`);

    if (!res.ok) {
      throw new Error("Failed to fetch venues");
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching the transactionss:", error);
    throw error;
  }
};
export const createVenue = async (venueData) => {
  console.log(venueData, "venuedatat");
  try {
    const res = await fetch(`${url}/api/venues/createvenue`, {
      method: "POST",
      body: venueData,
    });
    if (!res.ok) {
      throw new Error("Failed to create venue");
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while creating the venue:", error);
    throw error;
  }
};
export const updateVenueInfo = async (id, updatedData) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/venues/editvenue/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch venues");
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while updating the venue:", error);
    throw error; // Re-throw the error so it can be handled by the calling code
  }
};
