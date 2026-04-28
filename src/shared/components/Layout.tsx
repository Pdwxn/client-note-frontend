import Sidebar from "./Sidebar";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--bg-primary)]">
      {/* CLIENTS */}
      <Sidebar />

      {/* NOTES + EDITOR */}
      <div className="flex flex-1 bg-[var(--bg-primary)]">{children}</div>
    </div>
  );
}
