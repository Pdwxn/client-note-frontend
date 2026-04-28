"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { User } from "../types";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get<User>("/api/auth/me/");
      return res.data;
    },
  });
};
