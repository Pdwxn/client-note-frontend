"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/notes/", data);
      return res.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", variables.client],
      });
    },
  });
};