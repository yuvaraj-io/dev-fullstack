"use client";

import Heading from "@/components/ui-reusables/Heading";
import Download from "@/components/ui-reusables/Download";


import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { socials } from "@/constants/commons/constants";
import { redirect } from "@/components/ui-reusables/StackblitzCard";

export default function Connect() {
  return (
    <div className="py-6">
      {/* Heading */}
      <Heading icon="/" text="Contact" line />

      {/* Main */}
      <div className="flex justify-between gap-6 mob:flex-wrap">
        {/* Left */}
        <div className="w-full">
          <p className="mb-8 text-1.5r text-slate-400">
            I’m interested in developing ideas that bring life to applications.
            If you have an opportunity that aligns with our goals, let’s connect!
          </p>

          <Download />
        </div>

        {/* Right */}
        <div className="flex w-full gap-6">
          {/* Phone */}
          <div className="w-96 border border-slate-400 p-1.5r">
            <p className="pb-1r text-2r">Contact me here</p>
            <a
              href="tel:+917204447908"
              className="mt-2r text-1.5r text-slate-400"
            >
              +91 72044 47908
            </a>
          </div>

          {/* Messages */}
          <div className="w-96 flex-col border border-slate-400 p-1.5r">
            <p className="pb-1r text-2r">Message me here</p>

            <a
              href="https://wa.me/917204447908"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 text-lg text-slate-400 hover:text-green-500"
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
              className="flex items-center gap-2 text-lg text-slate-400 hover:text-blue-500"
            >
              <MdEmail className="text-3xl text-red-500" />
              Gmail: yuvarajthecoder@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-8">
        <Heading icon="#" text="Social Links" line />

        <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-4">
          <SocialItem
            label="Stackblitz"
            onClick={() => redirect(socials.stackblitz)}
          >
            <StackBlitzIcon />
          </SocialItem>

          <SocialItem
            label="Github"
            onClick={() => redirect(socials.github)}
          >
            <GithubIcon />
          </SocialItem>

          <SocialItem
            label="Medium"
            onClick={() => redirect(socials.medium)}
          >
            <MediumIcon />
          </SocialItem>

          <SocialItem
            label="Instagram"
            onClick={() => redirect(socials.instagram)}
          >
            <InstagramIcon />
          </SocialItem>

          <SocialItem
            label="LinkedIn"
            onClick={() => redirect(socials.linkedin)}
          >
            <LinkedinIcon />
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
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 border border-slate-400 p-4"
    >
      {children}
      <div className="text-2r">{label}</div>
    </div>
  );
}

/* Icons (kept inline like your original) */

function GithubIcon() {
  return (
    <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59..." />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5..." />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048..." />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M0 1.146C0 .513.526 0 1.175 0..." />
    </svg>
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