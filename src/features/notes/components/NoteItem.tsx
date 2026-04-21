"use client";

import { useState } from "react";
import { useUpdateNote } from "../hooks/useUpdateNote";

export default function NoteItem({ note }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(note.title);

  const { mutate } = useUpdateNote();

  const handleSave = () => {
    if (!value.trim()) return;

    mutate({
      id: note.id,
      data: {
        title: value,
        content: value,
        client: note.client,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm hover:border-gray-300 transition">
      {isEditing ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setValue(note.title);
              setIsEditing(false);
            }
          }}
          className="w-full outline-none text-gray-800"
        />
      ) : (
        <div onClick={() => setIsEditing(true)} className="cursor-text">
          <p className="font-medium text-gray-800">{note.title}</p>

          <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
            {note.type}
          </span>
        </div>
      )}
    </div>
  );
}
