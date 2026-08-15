"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaPaperPlane, FaSpinner, FaCheckCircle } from "react-icons/fa";

interface OnboardingFormProps {
  initialProjectType?: string;
  initialBudget?: string;
}

export default function OnboardingForm({
  initialProjectType = "New Development (₹250/hr)",
  initialBudget = "₹20,000 – ₹30,000 / month",
}: OnboardingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(initialProjectType);
  const [timeline, setTimeline] = useState("1 Month (20 Working Days)");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setError("Please provide either your email or phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/pricing/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType,
          estimatedBudget: initialBudget,
          timeline,
          details,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit project inquiry.");
      }

      setSubmitted(true);

      // Instantly open WhatsApp with the pre-filled inquiry message directly to Yuvaraj's Business WhatsApp
      const waUrl = `https://wa.me/917204447908?text=${encodeURIComponent(
        `🚀 *NEW PROJECT INQUIRY*\n━━━━━━━━━━━━━━━━━━━━\n👤 *Name:* ${name.trim()}\n📧 *Email:* ${email.trim() || "N/A"}\n📞 *Phone:* ${phone.trim() || "N/A"}\n💼 *Engagement:* ${projectType}\n⏱️ *Timeline:* ${timeline}\n\n📝 *Project Brief:* \n${details.trim() || "Let's discuss requirements"}\n━━━━━━━━━━━━━━━━━━━━\n_Sent via Yuvidev Pricing Portal_`
      )}`;

      try {
        window.open(waUrl, "_blank");
      } catch (openErr) {
        console.warn("Auto-popup blocked, user can click manual button:", openErr);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to submit inquiry. Please connect via WhatsApp or Email.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `🚀 *PROJECT INQUIRY*\n━━━━━━━━━━━━━━━━━━━━\n👤 *Name:* ${name || "Client"}\n📧 *Email:* ${email || "N/A"}\n📞 *Phone:* ${phone || "N/A"}\n💼 *Engagement:* ${projectType}\n⏱️ *Timeline:* ${timeline}\n\n📝 *Project Brief:* \n${details || "Let's discuss requirements"}`
  );

  return (
    <div
      id="onboarding-form"
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-white/10 dark:bg-slate-900/90 sm:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Intake Form */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Direct WhatsApp &amp; Database Onboarding
            </p>
          </div>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Have a Project? Onboard With Us!
          </h3>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            Submit your brief to save your slot and chat directly on WhatsApp.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-6 text-center dark:border-emerald-900/50 dark:bg-emerald-950/40"
            >
              <FaCheckCircle className="mx-auto text-4xl text-emerald-500" />
              <h4 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
                Inquiry Saved &amp; WhatsApp Ready!
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Thank you, <strong>{name}</strong>! Your inquiry is safely recorded. We have opened WhatsApp so you can send your brief directly to Yuvaraj.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/917204447908?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-extrabold text-white shadow-md transition hover:bg-emerald-700 hover:-translate-y-0.5"
                >
                  <FaWhatsapp className="text-lg" /> Send Message in WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setDetails("");
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Submit another brief
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Sharma"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-violet-400"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Project Engagement
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-violet-400"
                  >
                    <option value="New Development (₹250/hr - ₹20k to ₹30k/mo)">
                      New Development (Full Stack · ₹250/hr)
                    </option>
                    <option value="Frontend Migration (₹300/hr - ₹25k to ₹35k/mo)">
                      Frontend Migration (Modernization · ₹300/hr)
                    </option>
                    <option value="Custom Scope / Retainer">Custom Scope / Retainer</option>
                    <option value="Technical Consultation">Technical Consultation &amp; Code Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Target Timeline / Sprint
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-violet-400"
                >
                  <option value="2 Weeks Sprint (10 Days @ 4h/day)">2 Weeks Sprint (10 Days · ~40h)</option>
                  <option value="1 Month Sprint (20 Days @ 4h/day)">1 Month Sprint (20 Days · ~80h - Recommended)</option>
                  <option value="2 Months (40 Days @ 4h/day)">2 Months (40 Days · ~160h)</option>
                  <option value="3+ Months Ongoing Retainer">3+ Months Ongoing Retainer</option>
                  <option value="Urgent / Rush Timeline">Urgent / Fast Turnaround</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Project Summary &amp; Tech Stack
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Share a brief overview of your product, links to Figma/docs, or current repo challenges..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-violet-400"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-4 font-[family-name:var(--font-display)] text-base font-extrabold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-700 hover:to-teal-700 hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Saving Brief &amp; Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="text-xl" />
                    <span>Submit Inquiry &amp; Chat on WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Connect & Highlights */}
        <div className="space-y-6 lg:col-span-5 lg:border-l lg:border-slate-100 lg:pl-8 dark:lg:border-white/10">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-950/50">
            <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-slate-900 dark:text-white">
              Prefer Instant Communication?
            </h4>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Skip the form and chat directly on WhatsApp or schedule a quick discovery call.
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={`https://wa.me/917204447908?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
              >
                <FaWhatsapp className="text-xl text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div>WhatsApp Direct</div>
                  <div className="text-[0.65rem] font-normal text-emerald-700 dark:text-emerald-400">+91 72044 47908</div>
                </div>
              </a>

              <a
                href="mailto:developer@yuvidev.in?subject=New%20Project%20Inquiry"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
              >
                <FaEnvelope className="text-lg text-violet-600 dark:text-violet-400" />
                <div>
                  <div>Email Direct</div>
                  <div className="text-[0.65rem] font-normal text-slate-500 dark:text-slate-400">developer@yuvidev.in</div>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-xs text-slate-600 dark:border-white/15 dark:text-slate-300">
            <h5 className="font-bold text-slate-900 dark:text-white">Why the 4-Hour Daily Model Works:</h5>
            <p className="mt-1.5 leading-relaxed text-[0.75rem] text-slate-500 dark:text-slate-400">
              4 hours of uninterrupted, deep-work engineering yields higher quality output than a distracted 8-hour day full of meetings. You get predictable, daily progress with clear Git PRs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
