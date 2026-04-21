"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Login() {
  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm border">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Client Notes
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-gray-400"
          />

          <button
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-black font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
