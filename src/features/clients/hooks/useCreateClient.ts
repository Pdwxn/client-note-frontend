import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.post("/clients/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};