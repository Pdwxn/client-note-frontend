"use client";

import { useContext } from "react";
import { ClientContext } from "@/app/providers";
import { useNotes } from "../hooks/useNotes";

export default function NotesPanel() {
  const { selectedClient } = useContext(ClientContext);

  const { data, isLoading } = useNotes(selectedClient?.id);

  if (!selectedClient) {
    return <p>Select a client</p>;
  }

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {selectedClient.name}
      </h2>

      {data?.length === 0 && (
        <p className="text-gray-500">No notes yet</p>
      )}

      {data?.map((note: any) => (
        <div
          key={note.id}
          className="p-3 border rounded mb-2"
        >
          <p className="font-medium">{note.title}</p>
          <p className="text-sm text-gray-500">
            {note.type}
          </p>
        </div>
      ))}
    </div>
  );
}