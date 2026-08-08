"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthUser = {
  id: string;
  username: string;
  fullName: string;
  profileImage: string;
  role?: "admin" | "superuser" | "user";
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const syncFormFromUser = (nextUser: AuthUser) => {
    setUsername(nextUser.username);
    setFullName(nextUser.fullName || "");
    setProfileImage(nextUser.profileImage || "");
  };

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setUser(data.user);
          syncFormFromUser(data.user);
        } else {
          router.replace("/auth");
        }
      })
      .catch(() => router.replace("/auth"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const startEditing = () => {
    if (!user) {
      return;
    }

    syncFormFromUser(user);
    setError("");
    setMessage("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (!user) {
      return;
    }

    syncFormFromUser(user);
    setError("");
    setMessage("");
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Profile photo must be 2MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfileImage(result);
      setError("");
      setMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = async () => {
    if (!user) {
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ removeProfileImage: true }),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok || !data?.success) {
      setError(data?.message || "Unable to remove profile photo.");
      return;
    }

    setUser(data.user);
    setProfileImage("");
    setMessage("Profile photo removed.");
    router.refresh();
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    const payload: {
      username: string;
      fullName: string;
      profileImage?: string;
      removeProfileImage?: boolean;
    } = {
      username,
      fullName,
    };

    if (!profileImage) {
      payload.removeProfileImage = true;
    } else if (profileImage !== user.profileImage) {
      payload.profileImage = profileImage;
    }

    const response = await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok || !data?.success) {
      setError(data?.message || "Unable to update profile.");
      return;
    }

    setUser(data.user);
    syncFormFromUser(data.user);
    setMessage("Profile updated successfully.");
    setIsEditing(false);
    router.refresh();
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl py-16 text-center text-slate-600">
        Loading profile...
      </section>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = isEditing ? fullName : user.fullName;
  const displayUsername = isEditing ? username : user.username;
  const displayImage = isEditing ? profileImage : user.profileImage;
  const previewInitial =
    displayName?.charAt(0).toUpperCase() ||
    displayUsername.charAt(0).toUpperCase() ||
    "?";

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Profile</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Your account</h1>
        <p className="mt-3 text-lg text-slate-600">
          {isEditing
            ? "Update your username, name, and profile photo."
            : `Signed in as @${user.username}`}
        </p>
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {displayImage ? (
              <img
                src={displayImage}
                alt={displayName || displayUsername}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-violet-100"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-violet-600 text-4xl font-semibold text-white ring-4 ring-violet-100">
                {previewInitial}
              </div>
            )}

            <div className="flex w-full flex-1 flex-col gap-3">
              <label className="block text-sm font-medium text-slate-700">
                Profile photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2 block w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm"
                />
              </label>
              {displayImage ? (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  disabled={saving}
                  className="self-start rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-400 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Delete profile photo
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Full name
              <input
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500"
                placeholder="Your display name"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Username
              <input
                type="text"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500"
                placeholder="Choose a username"
              />
            </label>
            <p className="text-sm text-slate-500">
              Usernames must be unique. If someone already has that username, you&apos;ll see an error.
            </p>
          </div>

          {(error || message) && (
            <p className={`mt-4 text-sm ${error ? "text-rose-600" : "text-emerald-600"}`}>
              {error || message}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              disabled={saving}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-violet-100"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-violet-600 text-4xl font-semibold text-white ring-4 ring-violet-100">
                {user.fullName?.charAt(0).toUpperCase() || user.username.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Full name</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Username</p>
                <p className="mt-1 text-lg text-slate-700">@{user.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Role</p>
                <p className="mt-1 text-lg capitalize text-slate-700">{user.role || "user"}</p>
              </div>
            </div>
          </div>

          {message ? <p className="mt-6 text-sm text-emerald-600">{message}</p> : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={startEditing}
              className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Edit profile
            </button>
            {(user.role === "admin" || user.role === "superuser") && (
              <Link
                href="/admin"
                className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-center text-sm font-semibold text-violet-700 transition hover:border-violet-400 hover:bg-violet-100"
              >
                Admin panel
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Logout
            </button>
            <Link
              href="/"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Back to home
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
