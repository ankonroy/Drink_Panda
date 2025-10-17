"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/app/ThemeToggle";
import { getCurrentUser, logout, type User } from "@/lib/auth";

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    // Also listen to storage changes from other tabs
    function onStorage() {
      setUser(getCurrentUser());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <nav className="flex items-center gap-4">
      <Link
        className="transition-opacity opacity-80 hover:opacity-100"
        href="/"
      >
        Home
      </Link>

      {user ? (
        // logged in
        <>
          {user.role === "admin" && (
            <>
              <Link
                className="transition-opacity opacity-80 hover:opacity-100"
                href="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
              <Link
                className="transition-opacity opacity-80 hover:opacity-100"
                href="/admin/products"
              >
                Manage Products
              </Link>
            </>
          )}
          <Link
            className="transition-opacity opacity-80 hover:opacity-100"
            href="/chat"
          >
            Chat
          </Link>
          <Link
            className="transition-opacity opacity-80 hover:opacity-100"
            href="/profile"
          >
            Profile
          </Link>
          <Link
            className="transition-opacity opacity-80 hover:opacity-100"
            href="/cart"
          >
            My Cart
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110"
            onClick={async () => {
              await logout();
              setUser(null);
              router.replace("/");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        // not logged in
        <>
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold"
            style={{ backgroundColor: "rgb(55 65 81)", color: "#fff" }}
            href="/register"
          >
            Register
          </Link>
        </>
      )}

      <ThemeToggle />
    </nav>
  );
}
