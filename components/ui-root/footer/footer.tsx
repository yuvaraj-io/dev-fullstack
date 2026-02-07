"use client";

import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium } from "react-icons/fa";
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
                <FaGithub className="h-6 w-6 hover:text-white transition" />
              </Link>

              <Link href={socials.medium} target="_blank" aria-label="Medium">
                <FaMedium className="h-6 w-6 hover:text-white transition" />
              </Link>

              <Link href={socials.instagram} target="_blank" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 hover:text-white transition" />
              </Link>

              <Link href={socials.linkedin} target="_blank" aria-label="LinkedIn">
                <FaLinkedin className="h-6 w-6 hover:text-white transition" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
