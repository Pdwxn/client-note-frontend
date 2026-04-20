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
      <button
        onClick={handleLogout}
        className="mt-4 text-red-500"
      >
        Logout
      </button>
    </div>
  );
}