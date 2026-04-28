"use client";

import Layout from "@/shared/components/Layout";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "@/app/providers";
import NotesEditor from "@/features/notes/components/NotesEditor";
import { jwtDecode } from "jwt-decode";
import { useMe } from "@/features/auth/hooks/useMe";
import { useTheme } from "@/shared/hooks/useTheme";

export default function Dashboard() {
  const { selectedClient, selectedNote } = useContext(ClientContext);
  const { data: user, isLoading } = useMe();
  const { theme, toggleTheme } = useTheme();
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
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {!selectedClient && (
        <div className="flex flex-col items-center justify-center w-full text-[var(--text-muted)]">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
            {isLoading ? "Loading..." : `Hello ${user?.username || "there"} 👋`}
          </h1>

          <p className="text-sm text-[var(--text-muted)]">
            Your workspace is ready. Pick or create a client to begin.
          </p>
        </div>
      )}

      {selectedClient && (
        <div className="flex-1 p-6">
          {selectedNote ? (
            <NotesEditor />
          ) : (
            <p className="text-[var(--text-muted)]">Select a note</p>
          )}
        </div>
      )}
    </Layout>
  );
}