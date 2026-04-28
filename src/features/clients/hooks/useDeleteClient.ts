"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { handleApiError } from "@/shared/utils/apiError";

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: number) => {
      await api.delete(`/api/clients/${clientId}/`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (error) => {
      handleApiError(error, "Failed to delete client");
    },
  });
};
