"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";

type Topic = {
  id: number;
  name: string;
};

type HeaderProps = {
  topics: Topic[];
};

export default function Header({ topics }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigateToTopic = (id: number) => {
    setIsLearnOpen(false);
    setIsMobileOpen(false);
    router.push(`/learn/${id}`);
  };

  const linkClass = (path: string) =>
    pathname === path
      ? "text-purple-400"
      : "text-slate-300 hover:text-white";

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
            <Link href="/" className={linkClass("/")}># Home</Link>
            <Link href="/portfolio" className={linkClass("/portfolio")}># Portfolio</Link>
            <Link href="/about" className={linkClass("/about")}># About</Link>

            {/* Learn Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLearnOpen(v => !v)}
                className="flex items-center gap-2 rounded-md bg-purple-600 px-3 py-1.5 text-white hover:bg-purple-700"
              >
                Learn
                {isLearnOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>

              {isLearnOpen && (
                <ul className="absolute left-0 mt-2 w-48 rounded-md bg-slate-800 shadow-lg ring-1 ring-black/20">
                  {topics.map(topic => (
                    <li
                      key={topic.id}
                      onClick={() => navigateToTopic(topic.id)}
                      className="cursor-pointer px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
                    >
                      {topic.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/medium" className={linkClass("/medium")}># Medium</Link>
            <Link href="/stackblitz" className={linkClass("/stackblitz")}># Stackblitz</Link>
            <Link href="/connect" className={linkClass("/connect")}># Connect</Link>
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

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-slate-700">
          <div className="px-6 py-4 space-y-4 text-slate-200">

            <Link href="/" onClick={() => setIsMobileOpen(false)}>Home</Link>
            <Link href="/portfolio" onClick={() => setIsMobileOpen(false)}>Portfolio</Link>
            <Link href="/about" onClick={() => setIsMobileOpen(false)}>About</Link>

            {/* Mobile Learn */}
            <div>
              <button
                onClick={() => setIsLearnOpen(v => !v)}
                className="flex items-center gap-2 text-white"
              >
                Learn
                {isLearnOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>

              {isLearnOpen && (
                <ul className="mt-2 space-y-2 pl-4">
                  {topics.map(topic => (
                    <li
                      key={topic.id}
                      onClick={() => navigateToTopic(topic.id)}
                      className="cursor-pointer text-slate-300 hover:text-white"
                    >
                      {topic.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/medium" onClick={() => setIsMobileOpen(false)}>Medium</Link>
            <Link href="/stackblitz" onClick={() => setIsMobileOpen(false)}>Stackblitz</Link>
            <Link href="/connect" onClick={() => setIsMobileOpen(false)}>Connect</Link>
          </div>
        </div>
      )}
    </header>
  );
}
