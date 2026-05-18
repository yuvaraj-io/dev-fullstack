import Heading from "@/components/ui-reusables/Heading";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="py-16">
      <Heading icon="#" text="Connect me" line variant="gradient" />

      {/* CTA band */}
      <div className="mt-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 p-8 text-white shadow-lg shadow-violet-500/20">
        <p className="text-2xl font-extrabold">Let&apos;s build something great together.</p>
        <p className="mt-2 text-sm font-light text-violet-100">
          Open to full-time roles, freelance projects and consulting engagements.
        </p>
        <Link href="/connect">
          <button className="mt-6 rounded-xl border border-white/30 bg-white/15 px-6 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-violet-700">
            Get in touch →
          </button>
        </Link>
      </div>

      {/* Contact cards */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <p className="text-sm font-semibold text-slate-700">Call me</p>
          <a
            href="tel:+917204447908"
            className="mt-2 block text-base text-slate-500 transition hover:text-violet-600"
          >
            +91 72044 47908
          </a>
        </div>

        <div className="flex-1 space-y-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <p className="text-sm font-semibold text-slate-700">Message me</p>

          <a
            href="https://wa.me/917204447908"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-slate-500 transition hover:text-emerald-600"
          >
            <FaWhatsapp className="text-xl text-emerald-500" />
            WhatsApp
          </a>

          <a
            href="mailto:developer@yuvidev.in"
            className="flex items-center gap-3 text-sm text-slate-500 transition hover:text-violet-600"
          >
            <MdEmail className="text-xl text-violet-500" />
            developer@yuvidev.in
          </a>

          <a
            href="mailto:yuvarajthecoder@gmail.com"
            className="flex items-center gap-3 text-sm text-slate-500 transition hover:text-rose-600"
          >
            <MdEmail className="text-xl text-rose-400" />
            yuvarajthecoder@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
