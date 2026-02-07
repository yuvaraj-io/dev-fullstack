"use client";

import Heading from "@/components/ui-reusables/Heading";
import Download from "@/components/ui-reusables/Download";


import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { socials } from "@/constants/commons/constants";
import { FaGithub, FaInstagram, FaLinkedin, FaMedium } from "react-icons/fa";

export default function Connect() {
  return (
    <div className="py-6">
      {/* Heading */}
      <Heading icon="/" text="Contact" line variant="gradient" />

      {/* Main */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left */}
        <div className="w-full">
          <p className="mb-8 text-lg text-slate-400">
            I’m interested in developing ideas that bring life to applications.
            If you have an opportunity that aligns with our goals, let’s connect!
          </p>

          <Download />
        </div>

        {/* Right */}
        <div className="grid w-full gap-6 md:grid-cols-2">
          {/* Phone */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="mb-2 text-lg">Contact me here</p>
            <a
              href="tel:+917204447908"
              className="text-base text-slate-400 hover:text-white"
            >
              +91 72044 47908
            </a>
          </div>

          {/* Messages */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
            <p className="text-lg">Message me here</p>

            <a
              href="https://wa.me/917204447908"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-slate-400 hover:text-green-500"
            >
              <FaWhatsapp className="text-3xl text-green-500" />
              Connect on WhatsApp
            </a>

            <a
              href="mailto:developer@yuvidev.in"
              className="flex items-center gap-2 text-lg text-slate-400 hover:text-blue-500"
            >
              <MdEmail className="text-3xl text-blue-500" />
              Email: developer@yuvidev.in
            </a>

            <a
              href="mailto:yuvarajthecoder@gmail.com"
              className="flex items-center gap-2 text-lg text-slate-400 hover:text-red-500"
            >
              <MdEmail className="text-3xl text-red-500" />
              Gmail: yuvarajthecoder@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-8">
        <Heading icon="#" text="Social Links" line variant="gradient" />

        <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
          <SocialItem label="Stackblitz" href={socials.stackblitz}>
            <StackBlitzIcon />
          </SocialItem>

          <SocialItem label="Github" href={socials.github}>
            <FaGithub className="h-7 w-7" />
          </SocialItem>

          <SocialItem label="Medium" href={socials.medium}>
            <FaMedium className="h-7 w-7" />
          </SocialItem>

          <SocialItem label="Instagram" href={socials.instagram}>
            <FaInstagram className="h-7 w-7" />
          </SocialItem>

          <SocialItem label="LinkedIn" href={socials.linkedin}>
            <FaLinkedin className="h-7 w-7" />
          </SocialItem>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers */

function SocialItem({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-slate-300 transition hover:border-purple-500/60 hover:text-white"
    >
      {children}
      <div className="text-lg">{label}</div>
    </a>
  );
}

const StackBlitzIcon = () => {
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
     <img 
        src="https://c.staticblitz.com/assets/favicon_sb-861fe1b85c0dc928750c62de15fed96fc75e57ee366bd937bad17a3938917b3f.svg"
        alt="StackBlitz Logo"
        className="w-9 object-contain"
        />
      {/* Color Overlay */}
      <div className="absolute inset-0 mix-blend-multiply opacity-50" />
    </div>
  );
};
