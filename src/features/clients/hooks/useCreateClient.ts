import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/shared/utils/axios";
import { ClientCreate } from "../types";
import { AxiosError } from "axios";

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClientCreate) => api.post("/api/clients/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ name?: string[]; detail?: string }>;
      const message = axiosError.response?.data?.name?.[0] 
        || axiosError.response?.data?.detail 
        || "Failed to create client";
      toast.error(message);
    },
  });
};