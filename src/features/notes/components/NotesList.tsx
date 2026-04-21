"use client";

import { useContext } from "react";
import { ClientContext } from "@/app/providers";
import { useNotes } from "../hooks/useNotes";
import { useCreateNote } from "../hooks/useCreateNotes";

export default function NotesList() {
  const { selectedClient, selectedNote, setSelectedNote } =
    useContext(ClientContext);

  const { data, isLoading } = useNotes(selectedClient?.id);
  const { mutate } = useCreateNote();

  if (!selectedClient) {
    return <p>Select a client</p>;
  }

  const handleCreateNote = () => {
    mutate(
      {
        title: "Untitled",
        content: "",
        type: "idea",
        client: selectedClient.id,
      },
      {
        onSuccess: (newNote) => {
          setSelectedNote(newNote); // 🔥 abre editor automáticamente
        },
      },
    );
  };

  if (isLoading) return <p>Loading notes...</p>;

  return (
    <div className="w-64 border-r bg-gray-50 p-3 flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-600">
          {selectedClient.name}
        </h3>

        <button
          onClick={handleCreateNote}
          className="text-sm px-2 py-1 rounded hover:bg-gray-200"
        >
          +
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-1 overflow-y-auto">
        {data?.map((note: any) => (
          <div
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className={`px-3 py-2 rounded cursor-pointer text-sm ${
              selectedNote?.id === note.id
                ? "bg-white shadow"
                : "hover:bg-gray-200"
            }`}
          >
            {note.title || "Untitled"}
          </div>
        ))}
      </div>
    </div>
  );
}
