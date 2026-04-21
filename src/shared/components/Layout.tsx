import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-screen">
      {/* CLIENTS */}
      <Sidebar />

      {/* NOTES + EDITOR */}
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
