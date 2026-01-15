"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

import { NAV_LINKS } from "@/constants/navLinks";
import NavLinkItem from "./NavLinkItem";
import LearnDropdown from "./LearnDropdown";

type Topic = {
  id: number;
  name: string;
};

type Props = {
  topics: Topic[];
};

export default function Header({ topics }: Props) {
  const router = useRouter();

  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleTopicSelect = (id: number) => {
    setIsLearnOpen(false);
    setIsMobileOpen(false);
    router.push(`/learn/${id}`);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-purple-500 bg-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            YUVARAJ
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.slice(0, 3).map(link => (
              <NavLinkItem key={link.href} {...link} />
            ))}

            <LearnDropdown
              topics={topics}
              isOpen={isLearnOpen}
              onToggle={() => setIsLearnOpen(v => !v)}
              onSelect={handleTopicSelect}
            />

            {NAV_LINKS.slice(3).map(link => (
              <NavLinkItem key={link.href} {...link} />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileOpen(v => !v)}
          >
            {isMobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-slate-700">
          <div className="px-6 py-4 space-y-4 text-slate-200">
            {NAV_LINKS.map(link => (
              <NavLinkItem
                key={link.href}
                {...link}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}

            <LearnDropdown
              topics={topics}
              isOpen={isLearnOpen}
              onToggle={() => setIsLearnOpen(v => !v)}
              onSelect={handleTopicSelect}
              variant="mobile"
            />
          </div>
        </div>
      )}
    </header>
  );
}
