"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/navLinks";
import NavLinkItem from "./NavLinkItem";
import LearnDropdown from "./LearnDropdown";

type Topic = { id: number; name: string };

export default function Header() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/topics")
      .then((r) => r.json())
      .then(setTopics)
      .catch(() => setTopics([]));
  }, []);

  const handleTopicSelect = (id: string | number) => {
    setIsLearnOpen(false);
    setIsMobileOpen(false);
    router.push(`/learn?id=${btoa(String(id))}`);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
              YUVARAJ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <NavLinkItem key={link.href} {...link} />
            ))}
            <LearnDropdown
              topics={topics}
              isOpen={isLearnOpen}
              onToggle={() => setIsLearnOpen((v) => !v)}
              onSelect={handleTopicSelect}
            />
            {NAV_LINKS.slice(3).map((link) => (
              <NavLinkItem key={link.href} {...link} />
            ))}
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <LearnDropdown
              topics={topics}
              isOpen={isLearnOpen}
              onToggle={() => setIsLearnOpen((v) => !v)}
              onSelect={handleTopicSelect}
              variant="mobile"
            />
            <button
              className="text-slate-600 hover:text-slate-900"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${
          isMobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMobileOpen}
      >
        <div className="absolute inset-0 bg-slate-900/20" onClick={() => setIsMobileOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[80vw] border-l border-slate-200 bg-white shadow-2xl transition-transform ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-1 px-5 py-6">
            {NAV_LINKS.map((link) => (
              <NavLinkItem
                key={link.href}
                {...link}
                onClick={() => setIsMobileOpen(false)}
                className="block py-2.5 text-base"
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
