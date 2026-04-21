import api from "@/shared/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: any) => {
      const res = await api.patch(`/clients/${id}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
