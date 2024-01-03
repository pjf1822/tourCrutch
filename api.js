import { useMutation, useQuery } from "react-query";

// const apiUrl = "http://localhost:8001/api/venues";
const apiUrl = "https://tour-crutch-server.onrender.com/api/venues";

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
  return useMutation(async ({ id, updatedData }) => {
    console.log(`${apiUrl}/editvenue/${id}`, "this si the url ");
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

export const useDeleteVenue = () => {
  return useMutation(async (venueId) => {
    return fetch(`${apiUrl}/deletevenue/${venueId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete venue");
      }
      return res.json();
    });
  });
};

export const createComment = (venueId, commentData) => {
  console.log(venueId, commentData);
  return useMutation(
    async () => {
      return fetch(`${apiUrl}/createcomment/${venueId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create comment");
        }
        return res.json();
      });
    },
    {
      // Additional options for useMutation can be added here
    }
  );
};
