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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[var(--line)] pb-10">
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

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl">
              Let&apos;s Build Something{" "}
              <span 
                className="bg-clip-text text-transparent transition-all duration-300"
                style={{ backgroundImage: "var(--header-grad)" }}
              >
                Exceptional.
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg font-light">
              Looking for a seasoned Full Stack / Frontend Engineer (7+ yrs) with deep expertise in React, Angular, Vue, and Node.js? Let&apos;s talk.
            </p>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="shrink-0">
            <a
              href="https://wa.me/917204447908"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-2xs transition hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md dark:border-emerald-800/60 dark:bg-emerald-950/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <FaWhatsapp className="text-2xl" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Fastest Direct Line</div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] flex items-center gap-1">
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
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--signal)" }}>01 // Direct Channels</span>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)]">
                Contact Information
              </h2>
            </div>

            {/* Email Card with 1-Click Copy */}
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-2xs transition hover:border-[var(--signal)] hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div 
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xs"
                    style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
                  >
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--ink-soft)]">Direct Email</div>
                    <a
                      href="mailto:yuvarajthecoder@gmail.com"
                      className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] hover:text-[var(--signal)] transition-colors"
                    >
                      yuvarajthecoder@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyEmail("yuvarajthecoder@gmail.com")}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
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
            <div className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-2xs transition hover:border-emerald-300 hover:shadow-md">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <FaPhoneAlt className="text-base" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--ink-soft)]">Phone &amp; WhatsApp</div>
                    <a
                      href="tel:+917204447908"
                      className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] hover:text-emerald-600 transition-colors"
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
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                  Curriculum Vitae / Resume
                </span>
                <span className="text-[10px] font-mono font-semibold" style={{ color: "var(--signal)" }}>PDF Format</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleDownloadResume("YUVARAJ_FULLSTACK_DEVELOPER.pdf")}
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold text-white shadow-md transition hover:scale-[1.02] hover:opacity-90"
                  style={{ backgroundColor: "var(--signal)" }}
                >
                  <FaFileDownload />
                  <span>Full Stack CV</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadResume("YUVARAJ_FRONTEND_DEVELOPER.pdf")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-xs font-bold text-[var(--ink)] shadow-2xs transition hover:border-[var(--signal)] hover:text-[var(--signal)]"
                >
                  <FaFileDownload />
                  <span>Frontend CV</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8 shadow-2xs">
              <div className="mb-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--signal)" }}>02 // Instant Message</span>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)]">
                  Send a Direct Message
                </h2>
                <p className="mt-1 text-xs text-[var(--ink-soft)] font-light">
                  Fill in your project or role details below for an immediate conversation on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] transition focus:border-[var(--signal)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                      Email or Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] transition focus:border-[var(--signal)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                    Engagement Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] transition focus:border-[var(--signal)] focus:outline-none"
                  >
                    <option value="Full-Time Role">Full-Time Engineering Role</option>
                    <option value="Contract / Freelance Build">Contract / Freelance Build</option>
                    <option value="Technical Consulting & Architecture">Technical Consulting &amp; Architecture</option>
                    <option value="Other Collaboration">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-1.5">
                    Message / Project Brief
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product requirements, timeline, or open engineering position..."
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] transition focus:border-[var(--signal)] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.01] hover:opacity-95 disabled:opacity-70"
                    style={{ backgroundColor: "var(--signal)" }}
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
          <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-4">
            <div className="flex items-center gap-2">
              <HiSparkles className="text-lg" style={{ color: "var(--signal)" }} />
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)]">
                Developer Profiles &amp; Social Channels
              </h2>
            </div>
            <span className="font-mono text-xs text-[var(--ink-soft)]">6 Active Channels</span>
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
                  className="group flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--signal)] hover:shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-xs ${item.iconBg}`}>
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)] transition group-hover:text-[var(--signal)]">
                        {item.name}
                      </div>
                      <div className="text-xs text-[var(--ink-soft)] font-mono">
                        {item.handle}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--ink-soft)] font-light">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  <FaExternalLinkAlt className="text-xs text-[var(--ink-soft)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--signal)]" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
