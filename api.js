import { useMutation, useQuery } from "react-query";

// const apiUrl = "http://localhost:8001/api";
const apiUrl = "https://tour-crutch-server.onrender.com/api";

export const useFetchVenues = () => {
  return useQuery("venues", async () => {
    const res = await fetch(`${apiUrl}/venues/getallvenues`);
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.message || "Failed to get venues");
    }
    return res.json();
  });
};

export const useCreateVenue = () => {
  return useMutation(async (venueData) => {
    return fetch(`${apiUrl}/venues/createvenue`, {
      method: "POST",
      body: JSON.stringify(venueData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to create venue");
      }
      return res.json();
    });
  });
};
export const useUpdateVenueInfo = () => {
  return useMutation(async ({ id, updatedData }) => {
    return fetch(`${apiUrl}/venues/editvenue/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }).then(async (res) => {
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to update venue");
      }
      return res.json();
    });
  });
};

export const useDeleteVenue = () => {
  return useMutation(async (venueId) => {
    return fetch(`${apiUrl}/venues/deletevenue/${venueId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to delete venue");
      }
      return res.json();
    });
  });
};

export const useFetchVenueComments = (venueId) => {
  return useQuery(
    ["venueComments", venueId],
    async () => {
      const res = await fetch(`${apiUrl}/comments/getVenueComments/${venueId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch comments for venue ${venueId}`);
      }
      return res.json();
    },
    {
      onError: (error) => {
        console.error("Error fetching venue comments:", error);
      },
    }
  );
};
export const createComment = (venueId, commentData) => {
  return useMutation(async () => {
    return fetch(`${apiUrl}/comments/createcomment/${venueId}`, {
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
  }, {});
};

export const deleteComment = () => {
  return useMutation(async ({ venueId, commentId }) => {
    return fetch(`${apiUrl}/comments/deletecomment/${venueId}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }
      return res.json();
    });
  }, {});
};
