"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/notes/${id}/`);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
