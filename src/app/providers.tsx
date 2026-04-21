"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { Toaster } from "sonner";

export const ClientContext = createContext<any>(null);

const queryClient = new QueryClient();

export default function Providers({ children }: any) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  return (
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
          toastOptions={{
            className:
              "w-fit max-w-xs ml-auto text-sm px-3 py-2 rounded-md shadow-md border bg-white text-gray-800",
          }}
        />
      </ClientContext.Provider>
    </QueryClientProvider>
  );
}
