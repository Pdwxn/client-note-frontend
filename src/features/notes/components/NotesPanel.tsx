"use client";

import { useContext, useState } from "react";
import { ClientContext } from "@/app/providers";
import { useNotes } from "../hooks/useNotes";
import { useCreateNote } from "../hooks/useCreateNotes";

export default function NotesPanel() {
  const { selectedClient } = useContext(ClientContext);

  const { data, isLoading } = useNotes(selectedClient?.id);
  const { mutate } = useCreateNote(selectedClient?.id);

  const [title, setTitle] = useState("");

  if (!selectedClient) {
    return <p>Select a client</p>;
  }

  const handleCreate = () => {
    if (!title) return;

    mutate({
      title,
      content: "",
      type: "idea",
      client: selectedClient.id,
    });

    setTitle("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {selectedClient.name}
      </h2>

      {/* 🔥 Crear nota */}
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="New note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {data?.length === 0 && (
        <p className="text-gray-500">No notes yet</p>
      )}

      {data?.map((note: any) => (
        <div
          key={note.id}
          className="p-4 border rounded mb-2 hover:shadow-sm transition"
        >
          <p className="font-medium">{note.title}</p>

          <span className="text-xs text-gray-400">
            {note.type}
          </span>
        </div>
      ))}
    </div>
  );
}