"use client";

import { useClients } from "@/features/clients/hooks/useClients";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useCreateClient } from "@/features/clients/hooks/useCreateClient";
import { useCreateNote } from "@/features/notes/hooks/useCreateNotes";
import { useContext, useState } from "react";
import { ClientContext } from "@/app/providers";
import Modal from "@/shared/components/Modal";

export default function Sidebar() {
  const { selectedClient, setSelectedClient, selectedNote, setSelectedNote } =
    useContext(ClientContext);

  const { data: clients } = useClients();
  const { data: notes } = useNotes(selectedClient?.id);

  const { mutate: createClient } = useCreateClient();
  const { mutate: createNote } = useCreateNote();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  // 🔹 Crear cliente
  const handleCreateClient = () => {
    if (!name.trim()) return;

    createClient({ name, email: "" });
    setOpen(false);
    setName("");
  };

  // 🔹 Crear nota
  const handleCreateNote = () => {
    if (!selectedClient?.id) return;

    createNote(
      {
        title: "Untitled",
        content: "",
        type: "idea",
        client: selectedClient.id,
      },
      {
        onSuccess: (newNote) => {
          setSelectedNote(newNote);
        },
      },
    );
  };

  function updateClient(arg0: { id: any; data: { name: string } }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="w-64 border-r bg-white p-4 flex flex-col">
      {/* CLIENTS */}
      {!selectedClient && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-semibold text-gray-400 tracking-wide">
              CLIENTS
            </h2>

            <button
              onClick={() => setOpen(true)}
              className="px-2 py-1 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="space-y-1">
            {clients?.map((client: any) => (
              <div
                key={client.id}
                onClick={() => {
                  setSelectedClient(client);
                  setSelectedNote(null);
                }}
                className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm"
              >
                {client.name}
              </div>
            ))}
          </div>
        </>
      )}

      {/* NOTES */}
      {selectedClient && (
        <>
          <button
            onClick={() => {
              setSelectedClient(null);
              setSelectedNote(null);
            }}
            className="text-xs text-gray-400 mb-3 hover:text-black"
          >
            ← Back
          </button>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold">{selectedClient.name}</h3>

            <button
              onClick={handleCreateNote}
              className="px-2 py-1 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="space-y-1 overflow-y-auto">
            {notes?.map((note: any) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`px-3 py-2 rounded cursor-pointer text-sm ${
                  selectedNote?.id === note.id
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {note.title?.trim() || "Untitled"}
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODAL */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3 className="text-lg font-semibold mb-3">New Client</h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Client name"
            className="w-full border p-2 mb-3 rounded"
          />

          {selectedClient && (
            <input
              value={selectedClient.name || ""}
              onChange={(e) =>
                updateClient({
                  id: selectedClient.id,
                  data: { name: e.target.value },
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />
          )}

          <button
            onClick={handleCreateClient}
            className="w-full bg-black text-white py-2 rounded"
          >
            Create
          </button>
        </Modal>
      )}

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="mt-4 text-xs text-gray-400 hover:text-black"
      >
        Logout
      </button>
    </div>
  );
}
