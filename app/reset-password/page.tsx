"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!token) {
      setLoading(false);
      setError("Missing reset token. Start again from forgot password.");
      return;
    }

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword, confirmPassword }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok || !data?.success) {
      setError(data?.message || "Unable to reset password.");
      return;
    }

    setMessage(data.message || "Password updated successfully.");
    window.setTimeout(() => {
      router.push("/auth");
      router.refresh();
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 space-y-4"
    >
      {!token ? (
        <p className="text-sm text-rose-600">
          This reset link is missing a token.{" "}
          <Link href="/forgot-password" className="font-semibold underline">
            Request a new one
          </Link>
          .
        </p>
      ) : null}

      <label className="block text-sm font-medium text-slate-700">
        New password
        <input
          type="password"
          required
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          autoComplete="new-password"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500"
          placeholder="At least 6 characters"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Confirm new password
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-500"
          placeholder="Re-enter new password"
        />
      </label>

      {(error || message) && (
        <p className={`text-sm ${error ? "text-rose-600" : "text-emerald-600"}`}>
          {error || message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !token}
        className="w-full rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Updating..." : "Reset password"}
      </button>

      <p className="text-center text-sm text-slate-500">
        <Link href="/auth" className="font-semibold text-violet-700 hover:text-violet-900">
          Back to login
        </Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col gap-8 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Account</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Reset password</h1>
        <p className="mt-3 text-lg text-slate-600">Choose a new password for your account.</p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            Loading reset form...
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </section>
  );
}
