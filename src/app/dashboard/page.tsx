"use client";

import Layout from "@/shared/components/Layout";
import { useContext } from "react";
import { ClientContext } from "@/app/providers";
import NotesEditor from "@/features/notes/components/NotesEditor";

export default function Dashboard() {
  const { selectedClient, selectedNote } = useContext(ClientContext);

  return (
    <Layout>
      {!selectedClient && (
        <div className="flex items-center justify-center w-full text-gray-400">
          Select a client
        </div>
      )}

      {selectedClient && !selectedNote && (
        <div className="flex items-center justify-center w-full text-gray-400">
          Select a note or create one →
        </div>
      )}

      {selectedNote && <NotesEditor />}
    </Layout>
  );
}
