"use client";

import { useClients } from "@/features/clients/hooks/useClients";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useCreateClient } from "@/features/clients/hooks/useCreateClient";
import { useCreateNote } from "@/features/notes/hooks/useCreateNotes";
import { useContext, useState, useEffect } from "react";
import { ClientContext } from "@/app/providers";
import Modal from "@/shared/components/Modal";
import { useDeleteClient } from "@/features/clients/hooks/useDeleteClient";
import { useUpdateClient } from "@/features/clients/hooks/useUpdateClient";
import { toast } from "sonner";

export default function Sidebar() {
  const { selectedClient, setSelectedClient, selectedNote, setSelectedNote } =
    useContext(ClientContext);

  const { data: clients, isLoading: loadingClients } = useClients();
  const { data: notes, isLoading: loadingNotes } = useNotes(selectedClient?.id);

  const { mutate: createClient } = useCreateClient();
  const { mutate: createNote } = useCreateNote();
  const { mutate: deleteClient } = useDeleteClient();
  const { mutate: updateClient } = useUpdateClient();

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    if (selectedClient) {
      setClientName(selectedClient.name || "");
    }
  }, [selectedClient]);

  const handleCreateClient = () => {
    if (!name.trim()) return;

    createClient(
      { name, email: "" },
      {
        onSuccess: () => toast.success("Client created"),
        onError: () => toast.error("Error creating client"),
      },
    );

    setOpen(false);
    setName("");
  };

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
          toast.success("Note created");
        },
        onError: () => toast.error("Error creating note"),
      },
    );
  };

  const handleUpdateClient = () => {
    if (!selectedClient) return;

    updateClient(
      {
        id: selectedClient.id,
        data: { name: clientName },
      },
      {
        onSuccess: () => toast.success("Client updated"),
        onError: () => toast.error("Error updating client"),
      },
    );
  };

  return (
    <div className="w-64 border-r bg-white px-3 py-4 flex flex-col h-full">
      {!selectedClient && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-semibold text-gray-400 tracking-wide">
              CLIENTS
            </h2>

            <button
              onClick={() => setOpen(true)}
              className="px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          {loadingClients && (
            <p className="text-sm text-gray-400">Loading clients...</p>
          )}

          <div className="space-y-1">
            {clients?.map((client: any) => (
              <div
                key={client.id}
                onClick={() => {
                  setSelectedClient(client);
                  setSelectedNote(null);
                }}
                className="px-3 py-2 rounded-md cursor-pointer text-sm transition hover:bg-gray-100 text-gray-700"
              >
                {client.name}
              </div>
            ))}
          </div>
        </>
      )}

      {selectedClient && (
        <>
          <button
            onClick={() => {
              setSelectedClient(null);
              setSelectedNote(null);
            }}
            className="text-xs text-gray-400 mb-3 hover:text-black transition"
          >
            ← Back
          </button>

          <div className="mb-4">
            <input
              value={clientName || ""}
              onChange={(e) => setClientName(e.target.value)}
              onBlur={handleUpdateClient}
              className="w-full text-sm font-semibold outline-none placeholder:text-gray-300"
            />

            <button
              onClick={() => setConfirmOpen(true)}
              className="text-xs text-red-500 hover:underline mt-2"
            >
              Delete
            </button>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-400 tracking-wide">NOTES</span>

            <button
              onClick={handleCreateNote}
              className="px-2 py-1 rounded hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          {loadingNotes && (
            <p className="text-sm text-gray-400">Loading notes...</p>
          )}

          <div className="space-y-1 overflow-y-auto">
            {notes?.map((note: any) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`px-3 py-2 rounded-md cursor-pointer text-sm transition ${
                  selectedNote?.id === note.id
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {note.title?.trim() || "Untitled"}
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="mt-auto text-xs text-gray-500 hover:text-black pt-4"
      >
        Logout
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateClient();
            }}
          >
            <h3 className="text-lg font-semibold mb-3">New Client</h3>

            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Client name"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Create
            </button>
          </form>
        </Modal>
      )}

      {confirmOpen && selectedClient && (
        <Modal onClose={() => setConfirmOpen(false)}>
          <h3 className="text-lg font-semibold mb-3">Delete Client</h3>

          <p className="text-sm text-gray-600 mb-5">
            Delete <span className="font-medium">{selectedClient.name}</span>?
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-3 py-2 text-sm rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                deleteClient(selectedClient.id, {
                  onSuccess: () => {
                    setSelectedClient(null);
                    setSelectedNote(null);
                    toast.success("Client deleted");
                  },
                  onError: () => toast.error("Error deleting client"),
                });

                setConfirmOpen(false);
              }}
              className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
