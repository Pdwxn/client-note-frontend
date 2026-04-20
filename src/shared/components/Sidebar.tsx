"use client";

import { useClients } from "@/features/clients/hooks/useClients";
import { useContext } from "react";
import { ClientContext } from "@/app/providers";
import { useCreateClient } from "@/features/clients/hooks/useCreateClient";

export default function Sidebar() {
  const { data } = useClients();
  const { setSelectedClient, selectedClient } = useContext(ClientContext);
  const { mutate } = useCreateClient();

  return (
    <div className="w-64 border-r p-4">
      <h2 className="font-bold mb-4">Clients</h2>
      <button
        onClick={() =>
          mutate({ name: "Nuevo Cliente", email: "test@test.com" })
        }
      >
        + New
      </button>

      {data?.map((client: any) => (
        <div
          key={client.id}
          onClick={() => setSelectedClient(client)}
          className={`p-2 cursor-pointer rounded ${
            selectedClient?.id === client.id
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          {client.name}
        </div>
      ))}
    </div>
  );
}