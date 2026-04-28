import { useQuery } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { Client } from "../types";

export interface ClientFilters {
  search?: string;
  tags?: string;
  ordering?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const useClients = (filters?: ClientFilters, page?: number, limit?: number) => {
  return useQuery<PaginatedResponse<Client>>({
    queryKey: ["clients", filters, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters?.search) {
        params.append("search", filters.search);
      }
      if (filters?.tags) {
        params.append("tags", filters.tags);
      }
      if (filters?.ordering) {
        params.append("ordering", filters.ordering);
      }
      if (page !== undefined) {
        params.append("offset", (page * (limit || 20)).toString());
      }
      if (limit !== undefined) {
        params.append("limit", limit.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `/clients/?${queryString}` : "/clients/";
      
      const res = await api.get(url);
      return res.data;
    },
  });
};

export const useClientsList = (filters?: ClientFilters) => {
  const { data, ...rest } = useClients(filters);
  return {
    ...rest,
    data: data?.results || [],
    total: data?.count || 0,
  };
};