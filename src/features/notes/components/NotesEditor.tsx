"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { ClientContext } from "@/app/providers";
import { useDebounce } from "@/shared/hooks/useDebounce";
import Badge from "@/shared/components/Badge";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useDeleteNote } from "@/features/auth/hooks/useDeleteNote";

export default function NotesEditor() {
  const { selectedNote, setSelectedNote } = useContext(ClientContext);

  const { mutate: updateNote } = useUpdateNote();
  const { mutate: deleteNote } = useDeleteNote();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("idea");
  const [saving, setSaving] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const debouncedTitle = useDebounce(title, 800);
  const debouncedContent = useDebounce(content, 800);

  // 🔥 Sync con nota seleccionada
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
      setType(selectedNote.type || "idea");

      setTimeout(() => {
        titleRef.current?.focus();
      }, 0);
    }
  }, [selectedNote]);

  // 🔥 Autosave
  useEffect(() => {
    if (!selectedNote) return;

    if (
      debouncedTitle === selectedNote.title &&
      debouncedContent === selectedNote.content &&
      type === selectedNote.type
    ) {
      return;
    }

    setSaving(true);

    updateNote(
      {
        id: selectedNote.id,
        data: {
          title: debouncedTitle,
          content: debouncedContent,
          type,
          client: selectedNote.client,
        },
      },
      {
        onSettled: () => setSaving(false),
      },
    );
  }, [debouncedTitle, debouncedContent, type]);

  if (!selectedNote) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a note
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400">
          {saving ? "Saving..." : "Saved"}
        </span>

        <div className="flex items-center gap-2">
          {/* TYPE SELECTOR */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="text-xs border px-2 py-1 rounded bg-white"
          >
            <option value="idea">Idea</option>
            <option value="meeting">Meeting</option>
            <option value="call">Call</option>
            <option value="contract">Contract</option>
          </select>

          {/* BADGE */}
          <Badge type={type} />

          {/* DELETE */}
          <button
            onClick={() => {
              deleteNote(selectedNote.id, {
                onSuccess: () => {
                  setSelectedNote(null);
                },
              });
            }}
            className="text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* 🔥 TITLE */}
      <input
        ref={titleRef}
        className="text-4xl font-semibold w-full mb-6 outline-none"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 🔥 CONTENT */}
      <textarea
        className="w-full min-h-[400px] outline-none text-gray-700 resize-none leading-relaxed"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
