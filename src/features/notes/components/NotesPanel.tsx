"use client";

import { useContext, useState } from "react";
import { ClientContext } from "@/app/providers";
import { useNotes } from "../hooks/useNotes";
import { useCreateNote } from "../hooks/useCreateNotes";

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
    <div>
      <h2 className="text-xl font-bold mb-4">
        {selectedClient.name}
      </h2>

      <div className="mb-4">
        <input
          className="w-full p-4 text-lg border rounded-lg outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="Start typing a note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreate();
          }}
        />
      </div>

      {isLoading && <p>Loading...</p>}

      {data?.length === 0 && (
        <p className="text-gray-500">No notes yet</p>
      )}

    <div className="space-y-3">
      {data?.map((note: any) => (
        <div
          key={note.id}
          className="p-4 bg-white border rounded-lg hover:shadow-sm transition"
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-sm">{note.title}</p>

            <span className="text-xs text-gray-400 capitalize">
              {note.type}
            </span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}