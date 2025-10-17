"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getCurrentUser,
  logout,
  getAuthHeaders,
  API_URL,
  type User,
} from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) {
      router.replace("/login");
      return;
    }
    setUser(u);
  }, [router]);

  // avatar upload state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const onUploadAvatar = async () => {
    if (!avatarFile) return;
    setAvatarUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("avatar", avatarFile);
      const res = await fetch(`${API_URL}/api/user/avatar`, {
        method: "POST",
        headers: { ...getAuthHeaders() },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.message || "Failed to upload avatar");
      } else {
        const updated = data.data?.user ?? data.user ?? null;
        if (updated) {
          // update local stored auth user
          try {
            const raw = localStorage.getItem("drinkpanda_auth");
            if (raw) {
              const obj = JSON.parse(raw);
              obj.user = updated;
              localStorage.setItem("drinkpanda_auth", JSON.stringify(obj));
            }
          } catch {}
          setUser(updated);
          setMessage("Avatar updated");
          setAvatarFile(null);
        }
      }
    } catch {
      setMessage("Network error");
    } finally {
      setAvatarUploading(false);
    }
  };

  if (!user) return null;

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setFormErrors({});
    try {
      const res = await fetch(`${API_URL}/api/user/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: newPasswordConfirm,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.errors) setFormErrors(data.errors);
        setMessage(data?.message || "Failed to update password");
      } else {
        setMessage("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
      }
    } catch (err: unknown) {
      let msg: string | null = null;
      if (err && typeof err === "object" && "message" in err) {
        const maybe = err as Record<string, unknown>;
        if (typeof maybe.message === "string") msg = maybe.message;
      }
      setMessage(msg ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.message || "Failed to delete account");
      } else {
        // Clear local auth and redirect to signup
        await logout();
        router.replace("/register");
      }
    } catch (err: unknown) {
      let msg: string | null = null;
      if (err && typeof err === "object" && "message" in err) {
        const maybe = err as Record<string, unknown>;
        if (typeof maybe.message === "string") msg = maybe.message;
      }
      setMessage(msg ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h1 className="mb-2 text-xl font-extrabold">Profile</h1>

      {message && (
        <div className="mb-4 rounded bg-yellow-100 p-3 text-sm">{message}</div>
      )}

      <div className="grid gap-2 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Account details</h2>
          <div className="grid gap-1">
            <div className="flex items-center gap-3">
              <div>
                {(user as unknown) &&
                typeof user === "object" &&
                (user as Record<string, unknown>)["avatar"] ? (
                  <Image
                    src={(() => {
                      const avatar = (user as Record<string, unknown>)[
                        "avatar"
                      ];
                      if (typeof avatar === "string") {
                        if (avatar.startsWith("http")) return avatar;
                        return `${API_URL.replace(
                          /\/$/,
                          ""
                        )}/storage/${avatar}`;
                      }
                      return "/";
                    })()}
                    alt="avatar"
                    width={64}
                    height={64}
                    unoptimized
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    No photo
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setAvatarFile(e.target.files ? e.target.files[0] : null)
                  }
                />
                <div className="flex gap-2">
                  <button
                    disabled={!avatarFile || avatarUploading}
                    onClick={onUploadAvatar}
                    className="btn btn-primary"
                  >
                    {avatarUploading ? "Uploading…" : "Upload avatar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarFile(null)}
                    className="btn"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {user.role ?? "user"}
            </div>
            <div>
              <strong>Member since:</strong>{" "}
              {/* try to show created_at if present on user object */}{" "}
              {(() => {
                const maybeUser = user as unknown;
                if (maybeUser && typeof maybeUser === "object") {
                  const created = (maybeUser as Record<string, unknown>)[
                    "created_at"
                  ];
                  if (
                    typeof created === "string" ||
                    typeof created === "number"
                  ) {
                    return new Date(String(created)).toLocaleDateString();
                  }
                }
                return "-";
              })()}
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="inline-flex items-center justify-center rounded-lg bg-gray-700 px-4 py-2 text-gray-100 hover:bg-gray-600"
              onClick={() => router.push("/")}
            >
              Back home
            </button>
            <button
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110"
              onClick={async () => {
                await logout();
                router.replace("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Security</h2>
          <form onSubmit={onChangePassword} className="grid gap-2">
            <div>
              <label className="block text-sm font-medium">
                Current password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input-base mt-1 w-full"
                required
              />
              {formErrors.current_password && (
                <div className="text-sm text-red-600">
                  {formErrors.current_password.join(" ")}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-base mt-1 w-full"
                required
              />
              {formErrors.password && (
                <div className="text-sm text-red-600">
                  {formErrors.password.join(" ")}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm new password
              </label>
              <input
                type="password"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                className="input-base mt-1 w-full"
                required
              />
            </div>
            <div className="mt-2 flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Saving…" : "Change password"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setNewPasswordConfirm("");
                  setFormErrors({});
                }}
              >
                Reset
              </button>
            </div>
          </form>

          <hr className="my-4" />

          <div>
            <h3 className="mb-2 text-sm font-semibold text-red-600">
              Danger zone
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              Delete your account permanently. This cannot be undone.
            </p>
            <button
              onClick={onDeleteAccount}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
