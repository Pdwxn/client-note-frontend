"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState, ReactNode } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/shared/hooks/useTheme";
import { Client } from "@/features/clients/types";
import { Note } from "@/features/notes/types";

export const ClientContext = createContext<{
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
} | null>(null);

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ClientContext.Provider
          value={{
            selectedClient,
            setSelectedClient,
            selectedNote,
            setSelectedNote,
          }}
        >
          {children}
          <Toaster
            position="bottom-right"
            expand={false}
            richColors
            theme="system"
          />
        </ClientContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
