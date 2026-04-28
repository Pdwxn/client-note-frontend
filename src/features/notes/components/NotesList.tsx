"use client";

import { useContext } from "react";
import { ClientContext } from "@/app/providers";
import { useNotesList } from "../hooks/useNotes";
import { useCreateNote } from "../hooks/useCreateNotes";
import { Note } from "../types";

export default function NotesList() {
  const context = useContext(ClientContext);
  const selectedClient = context?.selectedClient;
  const selectedNote = context?.selectedNote;
  const setSelectedNote = context?.setSelectedNote;

  const { data, isLoading } = useNotesList(selectedClient?.id);
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
        onSuccess: (newNote: Note) => {
          if (setSelectedNote) setSelectedNote(newNote);
        },
      },
    );
  };

  if (isLoading) return <p>Loading notes...</p>;

  return (
    <div className="w-64 border-r bg-[var(--bg-primary)] p-3 flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {selectedClient.name}
        </h3>

        <button
          onClick={handleCreateNote}
          className="text-sm px-2 py-1 rounded hover:bg-[var(--bg-tertiary)]"
        >
          +
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-1 overflow-y-auto">
        {data?.map((note: Note) => (
          <div
            key={note.id}
            onClick={() => {
              if (setSelectedNote) setSelectedNote(note);
            }}
            className={`px-3 py-2 rounded cursor-pointer text-sm ${
              selectedNote?.id === note.id
                ? "bg-[var(--bg-secondary)] shadow"
                : "hover:bg-[var(--bg-tertiary)]"
            }`}
          >
            {note.title || "Untitled"}
          </div>
        ))}
      </div>
    </div>
  );
}
