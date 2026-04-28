import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-screen bg-[var(--bg-primary)]">
      {/* CLIENTS */}
      <Sidebar />

      {/* NOTES + EDITOR */}
      <div className="flex flex-1 bg-[var(--bg-primary)]">{children}</div>
    </div>
  );
}
