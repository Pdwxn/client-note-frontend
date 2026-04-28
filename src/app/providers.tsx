"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/shared/hooks/useTheme";

export const ClientContext = createContext<any>(null);

const queryClient = new QueryClient();

export default function Providers({ children }: any) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

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
