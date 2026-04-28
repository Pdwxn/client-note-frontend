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
import { useLogout } from "@/features/auth/hooks/useLogout";
import { toast } from "sonner";
import { Client } from "@/features/clients/types";
import { Note, NoteType } from "@/features/notes/types";

export default function Sidebar() {
  const context = useContext(ClientContext);
  const selectedClient = context?.selectedClient;
  const setSelectedClient = context?.setSelectedClient;
  const selectedNote = context?.selectedNote;
  const setSelectedNote = context?.setSelectedNote;

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [noteSearch, setNoteSearch] = useState("");
  const [noteSearchInput, setNoteSearchInput] = useState("");
  const [noteTypeFilter, setNoteTypeFilter] = useState<NoteType | "">("");
  
  const [clientPage, setClientPage] = useState(0);
  const [notePage, setNotePage] = useState(0);
  const LIMIT = 10;

  const { data: clientsData, isLoading: loadingClients } = useClients(
    { search: search || undefined },
    clientPage,
    LIMIT
  );
  const clients = clientsData?.results || [];
  const totalClients = clientsData?.count || 0;
  const totalClientPages = Math.ceil(totalClients / LIMIT);
  
  const { data: notesData, isLoading: loadingNotes } = useNotes(
    selectedClient?.id,
    { search: noteSearch || undefined, type: noteTypeFilter || undefined }
  );
  const notes = notesData?.results || [];
  const totalNotes = notesData?.count || 0;
  const totalNotePages = Math.ceil(totalNotes / LIMIT);

  const { mutate: createClient } = useCreateClient();
  const { mutate: createNote } = useCreateNote();
  const { mutate: deleteClient } = useDeleteClient();
  const { mutate: updateClient } = useUpdateClient();
  const { mutate: logout } = useLogout();

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCompany, setClientCompany] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setClientPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNoteSearch(noteSearchInput);
      setNotePage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [noteSearchInput]);
  
  useEffect(() => {
    setNotePage(0);
  }, [selectedClient]);

  useEffect(() => {
    if (selectedClient) {
      setClientName(selectedClient.name || "");
      setClientEmail(selectedClient.email || "");
      setClientPhone(selectedClient.phone || "");
      setClientCompany(selectedClient.company || "");
    }
  }, [selectedClient]);

  const handleCreateClient = () => {
    if (!name.trim()) return;

    createClient(
      {
        name,
        email: email || null,
        phone: phone || "",
        company: company || "",
        tags: []
      },
      {
        onSuccess: () => {
          toast.success("Client created");
          setOpen(false);
          setName("");
          setEmail("");
          setPhone("");
          setCompany("");
        },
      },
    );
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
          if (setSelectedNote) setSelectedNote(newNote);
          toast.success("Note created");
        },
      },
    );
  };

  const handleUpdateClient = () => {
    if (!selectedClient) return;

    updateClient(
      {
        id: selectedClient.id,
        data: { 
          name: clientName,
          email: clientEmail || null,
          phone: clientPhone,
          company: clientCompany,
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Client updated");
          if (setSelectedClient) setSelectedClient(data);
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update client");
        },
      },
    );
  };

  return (
    <div className="w-64 border-r bg-[var(--bg-secondary)] px-3 py-4 flex flex-col h-full">
      {!selectedClient && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-semibold text-[var(--text-muted)] tracking-wide">
              CLIENTS
            </h2>

            <button
              onClick={() => {
                setOpen(true);
                setName("");
              }}
              className="px-2 py-1 rounded hover:bg-[var(--bg-tertiary)] transition"
            >
              +
            </button>
          </div>

          <input
            type="text"
            placeholder="Search clients..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border p-2 mb-3 rounded text-sm outline-none focus:ring-1 focus:ring-gray-400 bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          />

          {loadingClients && (
            <p className="text-sm text-[var(--text-muted)]">Loading clients...</p>
          )}

          <div className="space-y-1 overflow-y-auto flex-1">
            {clients?.map((client: Client) => (
              <div
                key={client.id}
                onClick={() => {
                  if (setSelectedClient) setSelectedClient(client);
                  if (setSelectedNote) setSelectedNote(null);
                }}
                className="px-3 py-2 rounded-md cursor-pointer text-sm transition hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
              >
                {client.name}
              </div>
            ))}
          </div>

          {totalClientPages > 1 && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t">
              <button
                onClick={() => setClientPage((p) => Math.max(0, p - 1))}
                disabled={clientPage === 0}
                className="text-xs px-2 py-1 rounded bg-[var(--bg-tertiary)] text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <span className="text-xs text-[var(--text-muted)]">
                {clientPage + 1} / {totalClientPages}
              </span>
              <button
                onClick={() => setClientPage((p) => Math.min(totalClientPages - 1, p + 1))}
                disabled={clientPage >= totalClientPages - 1}
                className="text-xs px-2 py-1 rounded bg-[var(--bg-tertiary)] text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
        </>
      )}

      {selectedClient && (
        <>
          <button
            onClick={() => {
              if (setSelectedClient) setSelectedClient(null);
              if (setSelectedNote) setSelectedNote(null);
            }}
            className="text-xs text-[var(--text-muted)] mb-3 hover:text-[var(--text-primary)] transition"
          >
            ← Back
          </button>

          <div className="mb-4">
            <h2 
              onClick={() => setEditOpen(true)}
              className="text-lg font-semibold cursor-pointer hover:text-[var(--text-muted)]"
            >
              {selectedClient.name}
            </h2>
            
            {selectedClient.email && (
              <p className="text-xs text-[var(--text-muted)] mt-1">{selectedClient.email}</p>
            )}
            {selectedClient.phone && (
              <p className="text-xs text-[var(--text-muted)]">{selectedClient.phone}</p>
            )}
            {selectedClient.company && (
              <p className="text-xs text-[var(--text-muted)]">{selectedClient.company}</p>
            )}
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditOpen(true)}
                className="text-xs text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmOpen(true)}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search notes..."
            value={noteSearchInput}
            onChange={(e) => setNoteSearchInput(e.target.value)}
            className="w-full border p-2 mb-2 rounded text-sm outline-none focus:ring-1 focus:ring-gray-400"
          />

          <div className="flex gap-1 mb-3 flex-wrap">
            {(["call", "meeting", "idea", "contract"] as NoteType[]).map((type) => (
              <button
                key={type}
                onClick={() => setNoteTypeFilter(noteTypeFilter === type ? "" : type)}
                className={`text-xs px-2 py-1 rounded transition ${
                  noteTypeFilter === type
                    ? "bg-black text-white"
                    : "bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

<div className="flex justify-between items-center mb-3">
            <span className="text-xs text-[var(--text-muted)] tracking-wide">NOTES</span>

            <button
              onClick={handleCreateNote}
              className="px-2 py-1 rounded hover:bg-[var(--bg-tertiary)] transition"
            >
              +
            </button>
          </div>

          {loadingNotes && (
            <p className="text-sm text-[var(--text-muted)]">Loading notes...</p>
          )}

          <div className="space-y-1 overflow-y-auto">
            {notes?.map((note: Note) => (
              <div
                key={note.id}
                onClick={() => {
                if (setSelectedNote) setSelectedNote(note);
              }}
                className={`px-3 py-2 rounded-md cursor-pointer text-sm transition ${
                  selectedNote?.id === note.id
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                }`}
              >
                {note.title?.trim() || "Untitled"}
              </div>
            ))}
          </div>

          {totalNotePages > 1 && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t">
              <button
                onClick={() => setNotePage((p) => Math.max(0, p - 1))}
                disabled={notePage === 0}
                className="text-xs px-2 py-1 rounded bg-[var(--bg-tertiary)] text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <span className="text-xs text-[var(--text-muted)]">
                {notePage + 1} / {totalNotePages}
              </span>
              <button
                onClick={() => setNotePage((p) => Math.min(totalNotePages - 1, p + 1))}
                disabled={notePage >= totalNotePages - 1}
                className="text-xs px-2 py-1 rounded bg-[var(--bg-tertiary)] text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
        </>
      )}

      <button
        onClick={() => logout()}
        className="mt-auto text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] pt-4"
      >
        Logout
      </button>

      {open && (
        <Modal onClose={() => {
              setOpen(false);
              setName("");
              setEmail("");
              setPhone("");
              setCompany("");
            }}>
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
              placeholder="Client name *"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
              placeholder="Phone"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
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

      {editOpen && selectedClient && (
        <Modal onClose={() => setEditOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateClient();
            }}
          >
            <h3 className="text-lg font-semibold mb-3">Edit Client</h3>

            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client name *"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value.replace(/[^0-9+]/g, ''))}
              placeholder="Phone"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <input
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              placeholder="Company"
              className="w-full border p-2 mb-3 rounded outline-none focus:ring-1 focus:ring-gray-400"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Save
            </button>
          </form>
        </Modal>
      )}

      {confirmOpen && selectedClient && (
        <Modal onClose={() => setConfirmOpen(false)}>
          <h3 className="text-lg font-semibold mb-3">Delete Client</h3>

          <p className="text-sm text-[var(--text-muted)] mb-5">
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
                if (setSelectedClient) setSelectedClient(null);
                if (setSelectedNote) setSelectedNote(null);
                toast.success("Client deleted");
                setConfirmOpen(false);
              },
                });
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
