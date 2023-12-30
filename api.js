import { useMutation, useQuery } from "react-query";

const apiUrl = "http://localhost:8000/api/venues";

export const useFetchVenues = () => {
  return useQuery("venues", async () => {
    const res = await fetch(`${apiUrl}/getallvenues`);
    if (!res.ok) {
      throw new Error("Failed to fetch venues");
    }
    return res.json();
  });
};

export const useCreateVenue = () => {
  return useMutation(async (venueData) => {
    return fetch(`${apiUrl}/createvenue`, {
      method: "POST",
      body: JSON.stringify(venueData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create venue");
      }
      return res.json();
    });
  });
};
export const useUpdateVenueInfo = () => {
  return useMutation(({ id, updatedData }) => {
    return fetch(`${apiUrl}/editvenue/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update venue");
      }
      return res.json();
    });
  });
};
