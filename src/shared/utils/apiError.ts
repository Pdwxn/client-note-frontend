import { AxiosError } from "axios";
import { toast } from "sonner";

export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (!error.response) {
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        return "No connection to server. Please check your internet connection.";
      }
      if (error.code === "ECONNABORTED") {
        return "Request timed out. Please try again.";
      }
      return "Unable to connect to server";
    }
    
    const data = error.response?.data;
    
    if (data?.detail) {
      return data.detail;
    }
    
    if (data?.message) {
      return data.message;
    }
    
    if (typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      if (firstKey && Array.isArray(data[firstKey])) {
        return data[firstKey][0];
      }
    }
    
    return "An error occurred";
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return "An unexpected error occurred";
}

export function handleApiError(error: unknown, defaultMessage?: string): void {
  const message = getErrorMessage(error) || defaultMessage || "An error occurred";
  toast.error(message);
}

export function handleApiSuccess(message: string): void {
  toast.success(message);
}