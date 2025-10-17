"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, API_URL } from "@/lib/auth";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors(null);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("password", password);
      form.append("password_confirmation", passwordConfirm);
      if (avatarFile) form.append("avatar", avatarFile);

      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.errors) setFieldErrors(data.errors);
        else alert(data?.message || "Registration failed");
        return;
      }

      const payload = data.data ?? data;
      const stored = {
        user: payload.user,
        access_token: payload.access_token,
        token_type: payload.token_type || "Bearer",
      };
      localStorage.setItem("drinkpanda_auth", JSON.stringify(stored));
      router.push("/profile");
    } catch (err: unknown) {
      let msg = "Registration failed";
      if (err && typeof err === "object" && "message" in err) {
        const maybeMsg = err as unknown as { message?: unknown };
        if (maybeMsg && typeof maybeMsg.message === "string")
          msg = maybeMsg.message;
      }
      alert(msg);
    }
  }

  useEffect(() => {
    if (getCurrentUser()) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-xl font-extrabold">Create account</h1>
      <form onSubmit={onSubmit} className="card grid gap-3 p-4">
        <label className="grid gap-1">
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="input-base outline-none"
          />
        </label>
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
          {fieldErrors?.password && (
            <div className="text-sm text-red-500">
              {fieldErrors.password.join(" ")}
            </div>
          )}
        </label>
        <label className="grid gap-1">
          <span>Confirm password</span>
          <input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            type="password"
            placeholder="••••••••"
            className="input-base outline-none"
          />
          {fieldErrors?.password_confirmation && (
            <div className="text-sm text-red-500">
              {fieldErrors.password_confirmation.join(" ")}
            </div>
          )}
        </label>

        <label className="grid gap-1">
          <span>Profile picture (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setAvatarFile(e.target.files ? e.target.files[0] : null)
            }
            className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:text-emerald-700 hover:file:bg-emerald-200"
          />
          {fieldErrors?.avatar && (
            <div className="text-sm text-red-500">
              {fieldErrors.avatar.join(" ")}
            </div>
          )}
        </label>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110"
          type="submit"
        >
          Register
        </button>
      </form>
      <div className="mt-3 text-sm opacity-80">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          login here
        </Link>
        .
      </div>
    </div>
  );
}
