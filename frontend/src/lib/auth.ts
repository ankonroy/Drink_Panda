import { mergeCart } from './cart';

export type User = {
  id: string;
  name: string;
  email: string;
  // backend may not return role; keep optional
  role?: "user" | "admin";
};

type StoredAuth = {
  user: User;
  access_token: string;
  token_type: string;
};

const LS_KEY = "drinkpanda_auth";

export const API_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
  "http://localhost:8000";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as StoredAuth;
    return obj.user ?? null;
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as StoredAuth;
    return obj.access_token ?? null;
  } catch {
    return null;
  }
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data?.message || "Login failed";
    throw new Error(message);
  }

  const payload = data.data ?? data;
  const stored: StoredAuth = {
    user: payload.user,
    access_token: payload.access_token,
    token_type: payload.token_type || "Bearer",
  };
  localStorage.setItem(LS_KEY, JSON.stringify(stored));
  mergeCart();
  return stored.user;
}

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation?: string
): Promise<User> {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: password_confirmation ?? password,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    // If validation errors present, throw structured error to allow form UI to show field errors
    const message = data?.message || "Register failed";
  const err = new Error(message) as Error & { fields?: Record<string, string[]> };
  if (data?.errors) err.fields = data.errors;
  throw err;
  }

  const payload = data.data ?? data;
  const stored: StoredAuth = {
    user: payload.user,
    access_token: payload.access_token,
    token_type: payload.token_type || "Bearer",
  };
  localStorage.setItem(LS_KEY, JSON.stringify(stored));
  return stored.user;
}

export async function logout(): Promise<void> {
  try {
    const token = getAuthToken();
    if (token) {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch {
    // ignore network errors during logout
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(LS_KEY);
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  const token = getAuthToken();
  if (!token) return null;
  const res = await fetch(`${API_URL}/api/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data ?? null;
}
