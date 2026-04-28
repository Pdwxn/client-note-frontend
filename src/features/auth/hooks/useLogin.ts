"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import api from "@/shared/utils/axios";
import { LoginCredentials, Token } from "../types";

interface LoginSuccessData extends Token {
  user?: {
    id: number;
    username: string;
  };
}

export const useLogin = () => {
  return useMutation<LoginSuccessData, unknown, LoginCredentials>({
    mutationFn: async (data: LoginCredentials) => {
      const res = await api.post<LoginSuccessData>("/api/token/", data);
      return res.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      
      let message = "Login failed";
      
      if (!axiosError.response) {
        if (axiosError.code === "ERR_NETWORK" || axiosError.message === "Network Error") {
          message = "No connection to server. Please check your internet connection.";
        } else if (axiosError.code === "ECONNABORTED") {
          message = "Request timed out. Please try again.";
        } else {
          message = "Unable to connect to server";
        }
      } else if (axiosError.response.status === 401) {
        message = "Invalid username or password";
      }
      
      toast.error(message);
    },
  });
};