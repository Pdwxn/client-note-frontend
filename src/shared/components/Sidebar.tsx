"use client";

import { useClients } from "@/features/clients/hooks/useClients";
import { useContext } from "react";
import { ClientContext } from "@/app/providers";
import { useCreateClient } from "@/features/clients/hooks/useCreateClient";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { data } = useClients();
  const { setSelectedClient, selectedClient } = useContext(ClientContext);
  const { mutate } = useCreateClient();
  const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  router.push("/login");
};

  return (
    <div className="w-64 border-r bg-gray-50 h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-sm text-gray-600">
          Clients
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {data?.map((client: any) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className={`px-3 py-2 text-sm rounded-md cursor-pointer transition ${
              selectedClient?.id === client.id
                ? "bg-gray-200 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            {client.name}
          </div>
        ))}
      </div>

      <div className="p-3 border-t space-y-2">
        <button
          onClick={() =>
            mutate({ name: "Nuevo Cliente", email: "test@test.com" })
          }
          className="w-full text-sm bg-black text-white py-2 rounded-md"
        >
          + New Client
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-xs text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}