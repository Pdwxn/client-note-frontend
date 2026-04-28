"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/shared/utils/axios";
import { Note } from "../types";

export interface NoteFilters {
  search?: string;
  type?: string;
  ordering?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const useNotes = (clientId?: number, filters?: NoteFilters, page?: number, limit?: number) => {
  return useQuery<PaginatedResponse<Note>>({
    queryKey: ["notes", clientId, filters, page, limit],
    queryFn: async () => {
      if (!clientId) {
        return { count: 0, next: null, previous: null, results: [] };
      }
      
      const params = new URLSearchParams();
      params.append("client", clientId.toString());
      
      if (filters?.search) {
        params.append("search", filters.search);
      }
      if (filters?.type) {
        params.append("type", filters.type);
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

      const res = await api.get<PaginatedResponse<Note>>(`/api/notes/?${params.toString()}`);
      return res.data;
    },
    enabled: !!clientId,
  });
};

export const useNotesList = (clientId?: number, filters?: NoteFilters) => {
  const { data, ...rest } = useNotes(clientId, filters);
  return {
    ...rest,
    data: data?.results || [],
    total: data?.count || 0,
  };
};