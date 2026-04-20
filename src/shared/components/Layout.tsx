import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-white p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}