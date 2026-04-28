"use client";

import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-[var(--bg-secondary)] rounded-lg p-6 w-96 shadow-lg relative border">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
