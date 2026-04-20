"use client";

import { useContext } from "react";
import { ClientContext } from "@/app/providers";
import { useNotes } from "../hooks/useNotes";

export default function NotesList() {
  const { selectedClient } = useContext(ClientContext);

  const { data, isLoading } = useNotes(selectedClient?.id);

  if (!selectedClient) {
    return <p>Select a client</p>;
  }

  if (isLoading) return <p>Loading notes...</p>;

  return (
    <div>
      <h2 className="text-xl mb-4">
        Notes - {selectedClient.name}
      </h2>

      {data?.map((note: any) => (
        <div key={note.id} className="border p-3 mb-2 rounded">
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}