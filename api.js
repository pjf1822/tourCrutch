import { useMutation, useQuery } from "react-query";
import { supabase } from "./utils/SupabaseClient";

// const apiUrl = "http://localhost:8001/api";
const apiUrl = "https://tour-crutch-server.onrender.com/api";

export const useFetchVenues = (searchQuery, page) => {
  return useQuery(["venues", searchQuery], async () => {
    let query = supabase.from("venues").select("id, name, address");
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
      if (!venueId) return [];

      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("venueId", venueId)
        .order("created_at", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    {
      enabled: !!venueId,
      onError: (error) => {
        console.error("Error fetching venue comments:", error.message);
      },
    }
  );
};

export const addComment = async (venueId, userId, displayName, commentText) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          venueId: venueId,
          userUid: userId,
          userDisplayName: displayName,
          comment: commentText,
        },
      ])
      .select(); // This returns the inserted data

    if (error) throw error;
    return data[0]; // Return the first (and only) inserted comment
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const deleteComment = () => {
  return useMutation(async ({ venueId, commentId }) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("venueId", venueId);

    if (error) {
      throw new Error(error.message || "Failed to delete comment");
    }

    return { success: true };
  });
};
