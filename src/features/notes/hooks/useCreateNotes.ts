import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useCreateNote = (clientId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/notes/", data);
      return res.data;
    },
    onSuccess: () => {
      // 🔥 refresca notas automáticamente
      queryClient.invalidateQueries({
        queryKey: ["notes", clientId],
      });
    },
  });
};