"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useLogin = (options?: any) => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await api.post("/token/", data);
      return res.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
  });
};
