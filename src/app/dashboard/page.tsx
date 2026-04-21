"use client";

import Layout from "@/shared/components/Layout";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "@/app/providers";
import NotesEditor from "@/features/notes/components/NotesEditor";
import { jwtDecode } from "jwt-decode";
import { useMe } from "@/features/auth/hooks/useMe";

export default function Dashboard() {
  const { selectedClient, selectedNote } = useContext(ClientContext);
  const { data: user, isLoading } = useMe();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUsername(decoded.username || decoded.user || "");
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <Layout>
      {!selectedClient && (
        <div className="flex flex-col items-center justify-center w-full text-gray-400">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {isLoading ? "Loading..." : `Hello ${user?.username || "there"} 👋`}
          </h1>

          <p className="text-sm text-gray-500">
            Your workspace is ready. Pick or create a client to begin.
          </p>
        </div>
      )}

      {selectedClient && (
        <div className="flex-1 p-6">
          {selectedNote ? (
            <NotesEditor />
          ) : (
            <p className="text-gray-400">Select a note</p>
          )}
        </div>
      )}
    </Layout>
  );
}
