"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/shared/utils/axios";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me/");
      return res.data;
    },
  });
};
