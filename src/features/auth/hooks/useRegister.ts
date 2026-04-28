"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { RegisterData } from "../types";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await api.post("/auth/register/", data);
      return res.data;
    },
  });
};
