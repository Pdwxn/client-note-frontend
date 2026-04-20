import { useQuery } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useNotes = (clientId: number) => {
  return useQuery({
    queryKey: ["notes", clientId],
    queryFn: async () => {
      const res = await api.get(`/notes/?client=${clientId}`);
      return res.data;
    },
    enabled: !!clientId,
  });
};