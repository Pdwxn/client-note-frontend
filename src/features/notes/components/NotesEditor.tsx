"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { ClientContext } from "@/app/providers";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useDebounce } from "@/shared/hooks/useDebounce";

export default function NotesEditor() {
  const { selectedNote } = useContext(ClientContext);
  const { mutate } = useUpdateNote();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const debouncedTitle = useDebounce(title, 800);
  const debouncedContent = useDebounce(content, 800);

  const prevNoteId = useRef<number | null>(null);

  // 🔥 Sync cuando cambia la nota
  useEffect(() => {
    if (selectedNote && selectedNote.id !== prevNoteId.current) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
      prevNoteId.current = selectedNote.id;
    }
  }, [selectedNote]);

  // 🔥 Autosave con indicador
  useEffect(() => {
    if (!selectedNote) return;

    if (
      debouncedTitle === selectedNote.title &&
      debouncedContent === selectedNote.content
    ) {
      return;
    }

    setSaving(true);

    mutate(
      {
        id: selectedNote.id,
        data: {
          title: debouncedTitle,
          content: debouncedContent,
          client: selectedNote.client,
        },
      },
      {
        onSettled: () => setSaving(false),
      },
    );
  }, [debouncedTitle, debouncedContent]);

  if (!selectedNote) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a note
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* 🔥 STATUS */}
      <p className="text-xs text-gray-400 mb-2">
        {saving ? "Saving..." : "Saved"}
      </p>

      {/* TITLE */}
      <input
        className="text-4xl font-semibold w-full mb-6 outline-none"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* CONTENT */}
      <textarea
        className="w-full min-h-[400px] outline-none text-gray-700 resize-none leading-relaxed"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
