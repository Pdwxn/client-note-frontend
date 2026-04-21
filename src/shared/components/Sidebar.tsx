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
    <div className="w-64 border-r bg-white p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500">CLIENTS</h2>

        <button
          onClick={() =>
            mutate({ name: "Nuevo Cliente", email: "test@test.com" })
          }
          className="text-sm px-2 py-1 rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div className="flex-1 space-y-1">
        {data?.map((client: any) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className={`px-3 py-2 rounded cursor-pointer text-sm transition ${
              selectedClient?.id === client.id
                ? "bg-gray-200 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            {client.name}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="mt-4 text-xs text-gray-500 hover:text-black"
      >
        Logout
      </button>
    </div>
  );
}
