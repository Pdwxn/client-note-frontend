import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { NoteUpdate } from "../types";
import { handleApiError } from "@/shared/utils/apiError";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: NoteUpdate }) => {
      const res = await api.patch(`/notes/${id}/`, data);
      return res.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", variables.data.client],
      });
    },
    onError: (error) => {
      handleApiError(error, "Failed to update note");
    },
  });
};
