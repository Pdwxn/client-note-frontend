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
    if (!selectedClient) return;

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

  return (
    <div className="w-64 border-r bg-white p-4 flex flex-col">
      {/* 🔴 ESTADO 1: CLIENTS */}
      {!selectedClient && (
        <>
          <div className="flex justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500">CLIENTS</h2>

            <button onClick={() => setOpen(true)}>+</button>
          </div>

          <div className="space-y-1">
            {clients?.map((client: any) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                {client.name}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔵 ESTADO 2: NOTES */}
      {selectedClient && (
        <>
          <button
            onClick={() => {
              setSelectedClient(null);
              setSelectedNote(null);
            }}
            className="text-xs text-gray-500 mb-3"
          >
            ← Back
          </button>

          <div className="flex justify-between mb-4">
            <h3 className="text-sm font-semibold">{selectedClient.name}</h3>

            <button onClick={handleCreateNote}>+</button>
          </div>

          <div className="space-y-1">
            {notes?.map((note: any) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`px-3 py-2 rounded cursor-pointer ${
                  selectedNote?.id === note.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                {note.title || "Untitled"}
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODAL CLIENT */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Client name"
            className="w-full border p-2 mb-3"
          />

          <button
            onClick={handleCreateClient}
            className="w-full bg-black text-white py-2"
          >
            Create
          </button>
        </Modal>
      )}
    </div>
  );
}
