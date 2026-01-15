"use client";

import Link from "next/link";
import { socials } from "@/constants/commons/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-300 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-200">
              YUVARAJ
            </h2>
            <p className="mt-2 text-lg text-purple-500">
              Frontend Developer
            </p>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg text-slate-200">
              Social Media
            </h3>

            <div className="mt-4 flex gap-6 text-slate-300">
              <Link href={socials.github} target="_blank" aria-label="GitHub">
                <GithubIcon />
              </Link>

              <Link href={socials.medium} target="_blank" aria-label="Medium">
                <MediumIcon />
              </Link>

              <Link href={socials.instagram} target="_blank" aria-label="Instagram">
                <InstagramIcon />
              </Link>

              <Link href={socials.linkedin} target="_blank" aria-label="LinkedIn">
                <LinkedinIcon />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}


function GithubIcon() {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59..." />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5..." />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048..." />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M0 1.146C0 .513.526 0 1.175 0..." />
    </svg>
  );
}
