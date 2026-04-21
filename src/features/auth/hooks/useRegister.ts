"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await api.post("/auth/register/", data);
      return res.data;
    },
  });
};
