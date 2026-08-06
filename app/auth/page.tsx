"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
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
          router.replace("/");
        }
      })
      .catch(() => undefined);
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload = mode === "login"
      ? { username, password }
      : { username, password, fullName, profileImage };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok || !data?.success) {
      setMessage(data?.message || "Authentication failed.");
      return;
    }

    setMessage(mode === "login" ? "Welcome back!" : "Account created successfully.");
    router.push("/");
    router.refresh();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Authentication</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Create an account or sign in</h1>
        <p className="mt-3 text-lg text-slate-600">Use a simple username and password, and optionally add your profile picture.</p>
      </div>

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Why this helps</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Keep your own profile and identity inside the app.</li>
            <li>• Upload a profile picture when creating your account.</li>
            <li>• Stay signed in with a session stored securely in the browser.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex rounded-full border border-slate-200 p-1">
            <button
              type="button"
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === "login" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === "register" ? "bg-slate-900 text-white" : "text-slate-600"}`}
              onClick={() => setMode("register")}
            >
              Create account
            </button>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Username
            <input
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition focus:border-violet-500"
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
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition focus:border-violet-500"
              placeholder="Enter your password"
            />
          </label>

          {mode === "register" && (
            <>
              <label className="block text-sm font-medium text-slate-700">
                Full name
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 transition focus:border-violet-500"
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

              {profileImage && (
                <img src={profileImage} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>

          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
