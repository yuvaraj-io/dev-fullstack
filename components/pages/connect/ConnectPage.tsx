"use client";

import { useState } from "react";
import { 
  FaWhatsapp, 
  FaGithub, 
  FaLinkedin, 
  FaMedium, 
  FaInstagram, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaFileDownload, 
  FaExternalLinkAlt, 
  FaPaperPlane, 
  FaCheck, 
  FaCopy 
} from "react-icons/fa";
import { SiStackblitz } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";
import { socials } from "@/constants/commons/constants";

export default function ConnectPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Full-Time Role",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadResume = (file: string) => {
    const resumeUrl = `/assets/${file}`;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Format WhatsApp message as instant direct inquiry
    const text = encodeURIComponent(
      `👋 *New Inquiry from Portfolio*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Contact:* ${formData.email}\n` +
      `💼 *Engagement:* ${formData.inquiryType}\n\n` +
      `📝 *Message:* ${formData.message}`
    );

    const waUrl = `https://wa.me/917204447908?text=${text}`;
    window.open(waUrl, "_blank");

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1000);
  };

  const SOCIAL_CHANNELS = [
    {
      name: "WhatsApp",
      handle: "+91 72044 47908",
      role: "Instant Direct Messaging",
      url: "https://wa.me/917204447908",
      icon: FaWhatsapp,
      accent: "hover:border-emerald-500 hover:shadow-emerald-500/10",
      iconBg: "bg-emerald-500 text-white",
    },
    {
      name: "GitHub",
      handle: "yuvaraj-io",
      role: "Open-source & Code Repos",
      url: socials.github,
      icon: FaGithub,
      accent: "hover:border-slate-800 hover:shadow-slate-500/10",
      iconBg: "bg-slate-900 text-white",
    },
    {
      name: "LinkedIn",
      handle: "Yuvaraj S",
      role: "Professional Network & Career",
      url: socials.linkedin,
      icon: FaLinkedin,
      accent: "hover:border-blue-500 hover:shadow-blue-500/10",
      iconBg: "bg-[#0A66C2] text-white",
    },
    {
      name: "Medium",
      handle: "@yuvaraj.io",
      role: "Technical Architecture Publications",
      url: socials.medium,
      icon: FaMedium,
      accent: "hover:border-slate-900 hover:shadow-slate-500/10",
      iconBg: "bg-black text-white dark:bg-white dark:text-black",
    },
    {
      name: "StackBlitz",
      handle: "@yuvaraj.io",
      role: "26+ Interactive Code Sandboxes",
      url: socials.stackblitz,
      icon: SiStackblitz,
      accent: "hover:border-blue-500 hover:shadow-blue-500/10",
      iconBg: "bg-[#1389FD] text-white",
    },
    {
      name: "Instagram",
      handle: "yuvaraj.io",
      role: "Tech Content & Dev Snippets",
      url: socials.instagram,
      icon: FaInstagram,
      accent: "hover:border-pink-500 hover:shadow-pink-500/10",
      iconBg: "bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white",
    },
  ];

  return (
    <div className="relative min-h-screen py-10 md:py-16">
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-5xl bg-gradient-to-b from-violet-500/10 via-indigo-500/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200/80 pb-10 dark:border-white/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider font-bold">
                Available for New Engagements
              </span>
            </div>

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Exceptional.
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300 font-light">
              Looking for a seasoned Full Stack / Frontend Engineer (7+ yrs) with deep expertise in React, Angular, Vue, and Node.js? Let&apos;s talk.
            </p>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="shrink-0">
            <a
              href="https://wa.me/917204447908"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md dark:border-emerald-800/60 dark:bg-emerald-950/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <FaWhatsapp className="text-2xl" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Fastest Direct Line</div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  Chat on WhatsApp <FaExternalLinkAlt className="text-[0.65rem] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ── Main 2-Column Section: Contact Channels + Direct Inquiry Form ── */}
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* Left Column: Direct Channels & Resumes (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-violet-600">01 // Direct Channels</span>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Contact Information
              </h2>
            </div>

            {/* Email Card with 1-Click Copy */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400">Direct Email</div>
                    <a
                      href="mailto:yuvarajthecoder@gmail.com"
                      className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 hover:text-violet-600 dark:text-white"
                    >
                      yuvarajthecoder@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyEmail("yuvarajthecoder@gmail.com")}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
                >
                  {copiedEmail ? (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <FaCheck size={10} /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <FaCopy size={10} /> Copy
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <FaPhoneAlt className="text-base" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400">Phone &amp; WhatsApp</div>
                    <a
                      href="tel:+917204447908"
                      className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 hover:text-emerald-600 dark:text-white"
                    >
                      +91 72044 47908
                    </a>
                  </div>
                </div>

                <a
                  href="https://wa.me/917204447908"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/60 dark:text-emerald-300"
                >
                  <FaWhatsapp /> Chat
                </a>
              </div>
            </div>

            {/* Resume Downloads */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Curriculum Vitae / Resume
                </span>
                <span className="text-[10px] font-mono text-violet-600 font-semibold">PDF Format</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleDownloadResume("YUVARAJ_FULLSTACK_DEVELOPER.pdf")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-xs font-bold text-white shadow-md transition hover:bg-violet-700 hover:scale-[1.02]"
                >
                  <FaFileDownload />
                  <span>Full Stack CV</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadResume("YUVARAJ_FRONTEND_DEVELOPER.pdf")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-800 shadow-xs transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                >
                  <FaFileDownload />
                  <span>Frontend CV</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="mb-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-violet-600">02 // Instant Message</span>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Send a Direct Message
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-light">
                  Fill in your project or role details below for an immediate conversation on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                      Email or Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Engagement Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Full-Time Role">Full-Time Engineering Role</option>
                    <option value="Contract / Freelance Build">Contract / Freelance Build</option>
                    <option value="Technical Consulting & Architecture">Technical Consulting &amp; Architecture</option>
                    <option value="Other Collaboration">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                    Message / Project Brief
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product requirements, timeline, or open engineering position..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition focus:border-violet-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.01] hover:shadow-violet-500/40 disabled:opacity-70"
                  >
                    <FaPaperPlane className="text-xs transition-transform group-hover:translate-x-0.5" />
                    <span>{isSending ? "Opening WhatsApp..." : "Send Direct Inquiry"}</span>
                  </button>
                </div>

                {sentSuccess && (
                  <div className="rounded-xl bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    ✓ Inquiry ready! Chat window opened with pre-filled details.
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* ── Social Channels & Dev Profiles Grid ── */}
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <HiSparkles className="text-violet-600 text-lg" />
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Developer Profiles &amp; Social Channels
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-400">6 Active Channels</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOCIAL_CHANNELS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 ${item.accent}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-xs ${item.iconBg}`}>
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-base font-bold text-slate-900 transition group-hover:text-violet-600 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {item.handle}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500 font-light">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  <FaExternalLinkAlt className="text-xs text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900 dark:text-slate-600 dark:group-hover:text-white" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
