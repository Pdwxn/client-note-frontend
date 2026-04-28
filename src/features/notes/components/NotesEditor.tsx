"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { ClientContext } from "@/app/providers";
import { useDebounce } from "@/shared/hooks/useDebounce";
import Badge from "@/shared/components/Badge";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useDeleteNote } from "../hooks/useDeleteNote";

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

  useEffect(() => {
    if (selectedNote) {
      const noteTitle = selectedNote.title || "";
      const noteContent = selectedNote.content || "";
      
      setTitle(noteTitle);
      setContent(noteContent);
      setType(selectedNote.type || "idea");

      setTimeout(() => {
        titleRef.current?.focus();
      }, 0);
    }
  }, [selectedNote]);

  useEffect(() => {
    if (!selectedNote) return;

    const currentTitle = debouncedTitle || "Untitled";
    
    if (
      currentTitle === (selectedNote.title || "Untitled") &&
      debouncedContent === (selectedNote.content || "") &&
      type === selectedNote.type
    ) {
      return;
    }

    setSaving(true);

    updateNote(
      {
        id: selectedNote.id,
        data: {
          title: currentTitle,
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
      <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
        Select a note
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-xs text-[var(--text-muted)]">
            {saving ? "Saving..." : "Saved"}
          </span>
          {selectedNote?.created_at && (
            <span className="text-xs text-[var(--text-muted)]">
              Created: {new Date(selectedNote.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="text-xs border px-2 py-1 rounded bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          >
            <option value="idea">Idea</option>
            <option value="meeting">Meeting</option>
            <option value="call">Call</option>
            <option value="contract">Contract</option>
          </select>

          <Badge type={type} />

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

<input
        ref={titleRef}
        className="text-4xl font-semibold w-full mb-6 outline-none bg-transparent"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 🔥 CONTENT */}
      <textarea
        className="w-full min-h-[400px] outline-none resize-none leading-relaxed bg-transparent text-[var(--text-primary)]"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <textarea
        className="w-full min-h-[400px] outline-none resize-none leading-relaxed bg-transparent text-[var(--text-primary)]"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
