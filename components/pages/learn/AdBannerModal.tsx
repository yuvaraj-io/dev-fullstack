"use client";

import { useState } from "react";
import {
  FaBullhorn,
  FaTimes,
  FaCheckCircle,
  FaRocket,
  FaEye,
  FaChartLine,
} from "react-icons/fa";

interface AdBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdBannerModal({ isOpen, onClose }: AdBannerModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [placementType, setPlacementType] = useState("Blog Sidebar Banner");
  const [budget, setBudget] = useState("₹10,000 - ₹20,000");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      setError("Please provide your name and at least an email or phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        projectType: `Advertisement - ${placementType}`,
        estimatedBudget: budget,
        timeline: "Immediate / Next Available Slot",
        details: `Company/Brand: ${company.trim() || "N/A"}\nPlacement: ${placementType}\nCampaign Notes: ${details.trim() || "N/A"}`,
      };

      const res = await fetch("/api/pricing/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit advertisement inquiry.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={handleResetAndClose} />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-lg rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8 shadow-2xl transition-all max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        style={{ color: "var(--ink)" }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
          aria-label="Close modal"
        >
          <FaTimes size={13} />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
            >
              <FaCheckCircle size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
              Inquiry Received!
            </h3>
            <p className="text-sm text-[var(--ink-soft)] max-w-sm mx-auto">
              Thank you for your interest. We will review your campaign goals, check available ad slots, and get back to you within 24 hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90"
                style={{ backgroundColor: "var(--signal)" }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl shrink-0"
                style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
              >
                <FaBullhorn size={20} />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
                  Sponsor &amp; Advertise
                </h2>
                <p className="text-xs text-[var(--ink-soft)]">
                  Reach active developers, engineers, and tech decision-makers.
                </p>
              </div>
            </div>

            {/* Metrics Quick Highlights */}
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[var(--signal)]">
                  <FaRocket size={10} /> 10K+
                </div>
                <div className="text-[10px] text-[var(--ink-soft)]">Monthly Reads</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[var(--signal)]">
                  <FaEye size={10} /> Prime
                </div>
                <div className="text-[10px] text-[var(--ink-soft)]">Sidebar View</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-[var(--signal)]">
                  <FaChartLine size={10} /> High
                </div>
                <div className="text-[10px] text-[var(--ink-soft)]">CTR &amp; Clicks</div>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-600 dark:text-rose-300">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--signal)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--signal)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--signal)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Company / Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DevTools Inc"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--signal)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Placement Type
                  </label>
                  <select
                    value={placementType}
                    onChange={(e) => setPlacementType(e.target.value)}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--ink)] focus:border-[var(--signal)] focus:outline-none"
                  >
                    <option value="Blog Sidebar Banner">Blog Sidebar Banner</option>
                    <option value="Article Header Spotlight">Article Header Spotlight</option>
                    <option value="Dedicated Sponsored Tutorial">Dedicated Sponsored Tutorial</option>
                    <option value="Custom Brand Partnership">Custom Brand Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--ink)] focus:border-[var(--signal)] focus:outline-none"
                >
                  <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000 (1-2 Weeks)</option>
                  <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000 (1 Month)</option>
                  <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000 (Quarterly / Prime)</option>
                  <option value="$100 - $300">$100 - $300 (International)</option>
                  <option value="$500+">$500+ (Featured / Custom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                  Product Link or Campaign Goal
                </label>
                <textarea
                  rows={2}
                  placeholder="https://yourproduct.com — brief description of what you'd like to promote"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--signal)] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-3 text-xs font-bold text-white shadow-md transition hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--signal)" }}
                >
                  {loading ? "Submitting Inquiry..." : "Submit Advertisement Inquiry"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
