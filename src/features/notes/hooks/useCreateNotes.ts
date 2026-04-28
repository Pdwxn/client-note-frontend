"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { NoteCreate } from "../types";
import { handleApiError } from "@/shared/utils/apiError";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NoteCreate) => {
      const res = await api.post("/notes/", data);
      return res.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", variables.client],
      });
    },
    onError: (error) => {
      handleApiError(error, "Failed to create note");
    },
  });
};
