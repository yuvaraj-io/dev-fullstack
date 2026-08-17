"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/navLinks";
import NavLinkItem from "./NavLinkItem";
import LearnDropdown from "./LearnDropdown";

import ThemeDropdown from "./ThemeDropdown";

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
    <header 
      className="fixed top-0 z-50 w-full border-b transition-colors duration-250 backdrop-blur-xl shadow-2xs"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            <span
              className="bg-clip-text text-transparent transition-all duration-300 font-extrabold"
              style={{ backgroundImage: "var(--header-grad)" }}
            >
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

          {/* Theme Switcher + Account + Mobile */}
          <div className="flex items-center gap-3">
            {/* Theme Dropdown */}
            <ThemeDropdown />

            {authUser ? (
              <div className="flex items-center gap-2">
                {(authUser.role === "admin" || authUser.role === "superuser") && (
                  <Link
                    href="/admin"
                    className="rounded-full border px-3 py-2 text-sm font-semibold transition hover:opacity-90"
                    style={{
                      backgroundColor: "var(--signal-soft)",
                      borderColor: "var(--line)",
                      color: "var(--signal)",
                    }}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--signal)]"
                  title={`Signed in as ${authUser.username}`}
                >
                  {authUser.profileImage ? (
                    <img
                      src={authUser.profileImage}
                      alt={authUser.fullName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div 
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: "var(--signal)" }}
                    >
                      {authUser.fullName?.charAt(0).toUpperCase() || authUser.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[140px] truncate">@{authUser.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-[var(--line)] px-3 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="rounded-full px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 shadow-2xs"
                style={{
                  backgroundColor: "var(--signal)",
                  color: "var(--signal-text, #ffffff)",
                }}
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
                className="text-[var(--ink)] hover:opacity-80"
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
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMobileOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[80vw] border-l shadow-2xl transition-transform ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--line)",
          }}
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
              <div className="mt-4 space-y-2 border-t border-[var(--line)] pt-4">
                {(authUser.role === "admin" || authUser.role === "superuser") && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-2.5 text-base font-semibold"
                    style={{ color: "var(--signal)" }}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-2.5 text-base font-medium text-[var(--ink)]"
                >
                  Profile (@{authUser.username})
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2.5 text-left text-base font-medium text-[var(--ink-soft)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 block border-t border-[var(--line)] pt-4 text-base font-bold"
                style={{ color: "var(--signal)" }}
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
