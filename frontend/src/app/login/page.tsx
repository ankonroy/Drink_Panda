"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getCurrentUser()) {
      router.replace("/");
    }
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push("/profile");
    } catch (unknownErr) {
      const err = unknownErr as Error;
      setError(err?.message || "Login failed");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-xl font-extrabold">Login</h1>
      <form onSubmit={onSubmit} className="card grid gap-3 p-4">
        {error && <div className="text-red-400">{error}</div>}
        <label className="grid gap-1">
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="you@example.com"
            className="input-base outline-none"
          />
        </label>
        <label className="grid gap-1">
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="••••••••"
            className="input-base outline-none"
          />
        </label>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="mt-3 text-sm opacity-80">
        Don't have an account?{" "}
        <Link className="underline" href="/register">
          register here
        </Link>
        .
      </div>
    </div>
  );
}
