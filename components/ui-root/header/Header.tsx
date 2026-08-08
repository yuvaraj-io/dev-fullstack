"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/navLinks";
import NavLinkItem from "./NavLinkItem";
import LearnDropdown from "./LearnDropdown";

type Topic = { id: number; name: string };
type AuthUser = {
  id: string;
  username: string;
  fullName: string;
  profileImage: string;
  role?: "admin" | "superuser" | "user";
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/api/topics")
      .then((r) => r.json())
      .then(setTopics)
      .catch(() => setTopics([]));
  }, []);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (active && data?.success) {
          setAuthUser(data.user);
        } else {
          setAuthUser(null);
        }
      })
      .catch(() => setAuthUser(null));

    return () => {
      active = false;
    };
  }, [pathname]);

  const handleTopicSelect = (id: string | number) => {
    setIsLearnOpen(false);
    setIsMobileOpen(false);
    router.push(`/learn?id=${btoa(String(id))}`);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthUser(null);
    setIsMobileOpen(false);
    router.refresh();
    router.push("/");
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

          {/* Account + mobile */}
          <div className="flex items-center gap-3">
            {authUser ? (
              <div className="flex items-center gap-2">
                {(authUser.role === "admin" || authUser.role === "superuser") && (
                  <Link
                    href="/admin"
                    className="rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700 transition hover:border-violet-400 hover:bg-violet-100"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-400 hover:bg-violet-50"
                  title={`Signed in as ${authUser.username}`}
                >
                  {authUser.profileImage ? (
                    <img
                      src={authUser.profileImage}
                      alt={authUser.fullName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                      {authUser.fullName?.charAt(0).toUpperCase() || authUser.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[140px] truncate">@{authUser.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Login
              </Link>
            )}
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

            {authUser ? (
              <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                {(authUser.role === "admin" || authUser.role === "superuser") && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-2.5 text-base font-medium text-violet-700"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-2.5 text-base font-medium text-slate-700"
                >
                  Profile (@{authUser.username})
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2.5 text-left text-base font-medium text-slate-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 block border-t border-slate-200 pt-4 text-base font-semibold text-violet-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
