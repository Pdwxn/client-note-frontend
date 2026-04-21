"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useRouter } from "next/navigation";
import "../globals.css"

export default function Login() {
  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(form);
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      router.push("/dashboard");
    }
  }, []);
  
  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button disabled={isPending}>Login</button>
      </form>
    </div>
  );
}