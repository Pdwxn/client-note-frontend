"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          await axios.post(`${API_URL}/token/blacklist/`, {
            refresh: refreshToken,
          });
        } catch {
        }
      }
    },
    onSuccess: () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      queryClient.clear();
      router.push("/login");
    },
    onError: () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      queryClient.clear();
      router.push("/login");
    },
  });
};