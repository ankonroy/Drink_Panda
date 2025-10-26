"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/app/ThemeToggle";
import { getCurrentUser, logout, type User } from "@/lib/auth";

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    // Also listen to storage changes from other tabs
    function onStorage() {
      setUser(getCurrentUser());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-4">
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

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgb(var(--surface))] border-b border-gray-500/30 shadow-lg z-40">
          <div className="flex flex-col gap-2 p-4">
            <Link
              className="transition-opacity opacity-80 hover:opacity-100 py-2"
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {user ? (
              // logged in
              <>
                {user.role === "admin" && (
                  <>
                    <Link
                      className="transition-opacity opacity-80 hover:opacity-100 py-2"
                      href="/admin/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      className="transition-opacity opacity-80 hover:opacity-100 py-2"
                      href="/admin/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Manage Products
                    </Link>
                  </>
                )}
                <Link
                  className="transition-opacity opacity-80 hover:opacity-100 py-2"
                  href="/chat"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Chat
                </Link>
                <Link
                  className="transition-opacity opacity-80 hover:opacity-100 py-2"
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  className="transition-opacity opacity-80 hover:opacity-100 py-2"
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Cart
                </Link>
                <button
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110 w-full"
                  onClick={async () => {
                    await logout();
                    setUser(null);
                    router.replace("/");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              // not logged in
              <>
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110 w-full"
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold w-full"
                  style={{ backgroundColor: "rgb(55 65 81)", color: "#fff" }}
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            <div className="py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
