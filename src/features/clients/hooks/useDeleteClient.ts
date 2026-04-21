"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: number) => {
      await api.delete(`/clients/${clientId}/`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
};
