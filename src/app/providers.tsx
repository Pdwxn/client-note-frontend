"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const ClientContext = createContext<any>(null);

const queryClient = new QueryClient();

export default function Providers({ children }: any) {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ClientContext.Provider
        value={{ selectedClient, setSelectedClient }}
      >
        {children}
      </ClientContext.Provider>
    </QueryClientProvider>
  );
}