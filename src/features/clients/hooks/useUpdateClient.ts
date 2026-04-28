import api from "@/shared/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientUpdate } from "../types";
import { handleApiError } from "@/shared/utils/apiError";

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ClientUpdate }) => {
      const res = await api.patch(`/api/clients/${id}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      handleApiError(error, "Failed to update client");
    },
  });
};
