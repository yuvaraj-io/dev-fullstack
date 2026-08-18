"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok || !data?.success) {
      setError(data?.message || "Unable to start password reset.");
      return;
    }

    if (data.resetToken) {
      router.push(`/reset-password?token=${encodeURIComponent(data.resetToken)}`);
      return;
    }

    setMessage(data.message || "If an account exists for that username, continue from there.");
  };

  return (
    <section className="mx-auto flex max-w-xl flex-col gap-8 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Account</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Forgot password</h1>
        <p className="mt-3 text-lg text-slate-600">
          Enter your username to continue and set a new password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 space-y-4"
      >
        <label className="block text-sm font-medium text-slate-700">
          Username
          <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500"
            placeholder="Your username"
          />
        </label>

        {(error || message) && (
          <p className={`text-sm ${error ? "text-rose-600" : "text-emerald-600"}`}>
            {error || message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Checking..." : "Continue"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Remembered it?{" "}
          <Link href="/auth" className="font-semibold text-violet-700 hover:text-violet-900">
            Back to login
          </Link>
        </p>
      </form>
    </section>
  );
}
