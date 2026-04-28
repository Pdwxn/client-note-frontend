"use client";

import { useState } from "react";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useRouter } from "next/navigation";
import { RegisterData } from "@/features/auth/types";
import { LoginCredentials } from "@/features/auth/types";

export default function Register() {
  const router = useRouter();

  const { mutate: register, isPending } = useRegister();
  const { mutate: login } = useLogin();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registerData: RegisterData = form;
    const loginData: LoginCredentials = form;

    register(registerData, {
      onSuccess: () => {
        login(loginData, {
          onSuccess: () => {
            router.push("/dashboard");
          },
        });
      },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[var(--bg-primary)]">
      <div className="bg-[var(--bg-secondary)] p-8 rounded-xl shadow-sm w-[350px] border">
        {/* 🔙 BACK */}
        <button
          onClick={() => router.push("/login")}
          className="text-sm text-[var(--text-muted)] mb-4 hover:text-[var(--text-primary)]"
        >
          ← Back to login
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center text-[var(--text-primary)]">
          Create account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded bg-[var(--bg-primary)] text-[var(--text-primary)]"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded bg-[var(--bg-primary)] text-[var(--text-primary)]"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            disabled={isPending}
            className="w-full bg-black text-white py-2 rounded"
          >
            {isPending ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
