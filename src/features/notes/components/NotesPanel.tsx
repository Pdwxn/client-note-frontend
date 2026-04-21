"use client";

import { useContext, useState } from "react";
import { ClientContext } from "@/app/providers";
import { useNotes } from "../hooks/useNotes";
import { useCreateNote } from "../hooks/useCreateNotes";
import NoteItem from "./NoteItem";

export default function NotesPanel() {
  const { selectedClient } = useContext(ClientContext);

  const { data, isLoading } = useNotes(selectedClient?.id);
  const { mutate, isPending } = useCreateNote();

  const [title, setTitle] = useState("");

  if (!selectedClient) {
    return <p>Select a client</p>;
  }

  const handleCreate = () => {
    if (!title.trim()) return;

    mutate({
      title,
      content: title,
      type: "idea",
      client: selectedClient.id,
    });

    setTitle("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">{selectedClient.name}</h2>

      <div className="mb-6">
        <input
          className="w-full p-4 text-lg bg-transparent border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black/10 transition"
          placeholder="Start typing a note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreate();
          }}
        />
      </div>

      {isLoading && <p className="text-sm text-gray-400">Loading notes...</p>}

      <p className="text-sm text-gray-400">
        No notes yet. Start typing above 👆
      </p>

      <div className="space-y-2">
        {data?.map((note: any) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
