import { useQuery } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { Client } from "../types";

export const useClients = () => {
  return useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("/clients/");
      return res.data;
    },
  });
};