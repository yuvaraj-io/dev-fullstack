"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthUser = {
  id: string;
  username: string;
  fullName: string;
  profileImage: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setUser(data.user);
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

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Profile</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Your account</h1>
        <p className="mt-3 text-lg text-slate-600">Signed in as @{user.username}</p>
      </div>

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
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleLogout}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Logout
          </button>
          <Link
            href="/"
            className="rounded-2xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
