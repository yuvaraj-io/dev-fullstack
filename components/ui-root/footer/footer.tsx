"use client";

import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium } from "react-icons/fa";
import { socials } from "@/constants/commons/constants";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-xl font-extrabold text-transparent">
              YUVARAJ
            </h2>
            <p className="mt-1 text-sm text-slate-500">Full Stack Developer · India</p>
          </div>

          <div className="flex gap-5 text-slate-400">
            <Link href={socials.github} target="_blank" aria-label="GitHub">
              <FaGithub className="h-5 w-5 transition hover:text-slate-800" />
            </Link>
            <Link href={socials.medium} target="_blank" aria-label="Medium">
              <FaMedium className="h-5 w-5 transition hover:text-slate-800" />
            </Link>
            <Link href={socials.instagram} target="_blank" aria-label="Instagram">
              <FaInstagram className="h-5 w-5 transition hover:text-pink-500" />
            </Link>
            <Link href={socials.linkedin} target="_blank" aria-label="LinkedIn">
              <FaLinkedin className="h-5 w-5 transition hover:text-blue-600" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/5">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Yuvaraj. Built with Next.js &amp; MongoDB.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/pricing" className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-white">
              Pricing &amp; Rates
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-amber-800 transition hover:border-amber-400 hover:bg-amber-100 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300"
            >
              <span>☕ Buy Me a Coffee</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
