"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default function Login() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const res = await axios.post(`${API_URL}/api/token/`, form, {
        timeout: 5000,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      router.push("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError;

      let message = "Login failed";

      if (!axiosError.response) {
        if (
          axiosError.code === "ERR_NETWORK" ||
          axiosError.message === "Network Error"
        ) {
          message =
            "No connection to server. Please check your internet connection.";
        } else if (axiosError.code === "ECONNABORTED") {
          message = "Request timed out. Please try again.";
        } else {
          message = "Unable to connect to server";
        }
      } else if (axiosError.response.status === 401) {
        message = "Invalid username or password";
      }

      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="w-full max-w-sm bg-[var(--bg-secondary)] p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-semibold mb-6 text-center text-[var(--text-primary)]">
          Client Notes
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-gray-400 bg-[var(--bg-primary)] text-[var(--text-primary)]"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-gray-400 bg-[var(--bg-primary)] text-[var(--text-primary)]"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-[var(--text-muted)]">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-[var(--text-primary)] font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}