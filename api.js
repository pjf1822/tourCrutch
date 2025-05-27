import { useMutation, useQuery } from "react-query";
import { supabase } from "./utils/SupabaseClient";

// const apiUrl = "http://localhost:8001/api";
const apiUrl = "https://tour-crutch-server.onrender.com/api";

export const useFetchVenues = (searchQuery, page) => {
  return useQuery(["venues", searchQuery], async () => {
    let query = supabase.from("venues").select("*");
    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  });
};

export const useFetchVenueById = (venueId) => {
  return useQuery(["venue", venueId], async () => {
    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .eq("id", venueId)
      .single();
    if (error) {
      throw error;
    }

    return data;
  });
};

export const useCreateVenue = () => {
  return useMutation(async (venueData) => {
    const { data, error } = await supabase
      .from("venues")
      .insert(venueData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create venue");
    }

    return data;
  });
};

export const useUpdateVenueInfo = () => {
  return useMutation(async ({ id, updatedData }) => {
    const { data, error } = await supabase
      .from("venues")
      .update(updatedData)
      .eq("id", id)
      .single();

    console.log(data, error, "show me the fucking thing");
    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
};

export const useDeleteVenue = () => {
  return useMutation(async (venueId) => {
    const { error } = await supabase.from("venues").delete().eq("id", venueId);

    if (error) {
      throw new Error(error.message || "Failed to delete venue");
    }

    return { success: true, id: venueId };
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
