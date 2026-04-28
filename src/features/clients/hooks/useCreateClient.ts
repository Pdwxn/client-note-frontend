import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/shared/utils/axios";
import { ClientCreate } from "../types";

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClientCreate) => api.post("/clients/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: unknown) => {
      const message = (error as any)?.response?.data?.name?.[0] 
        || (error as any)?.response?.data?.detail 
        || "Failed to create client";
      toast.error(message);
    },
  });
};