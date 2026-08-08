"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          router.replace(data.user.role === "admin" || data.user.role === "superuser" ? "/admin" : "/profile");
        }
      })
      .catch(() => undefined);
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/admin-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, fullName, profileImage }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok || !data?.success) {
      setMessage(data?.message || "Unable to create admin account.");
      return;
    }

    setMessage("Admin account created successfully.");
    router.push("/admin");
    router.refresh();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfileImage(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Admin signup</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Create an admin account</h1>
        <p className="mt-3 text-lg text-slate-600">
          Accounts created here are assigned the admin role and can access the admin page.
        </p>
      </div>

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">What you get</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Admin role is assigned automatically.</li>
            <li>• Full access to the users admin page.</li>
            <li>• Ability to manage roles for other users.</li>
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            Need a normal account instead?{" "}
            <Link href="/auth" className="font-semibold text-violet-700 hover:text-violet-900">
              Use regular signup
            </Link>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500"
              placeholder="Enter your password"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Full name
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500"
              placeholder="Your display name"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Profile picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 block w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm"
            />
          </label>

          {profileImage ? (
            <img src={profileImage} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating admin..." : "Create admin account"}
          </button>

          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
