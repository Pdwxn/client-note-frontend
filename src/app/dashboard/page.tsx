"use client";

import Layout from "@/shared/components/Layout";
import NotesPanel from "@/features/notes/components/NotesPanel";

export default function Dashboard() {
  return (
    <Layout>
      <NotesPanel />
    </Layout>
  );
}