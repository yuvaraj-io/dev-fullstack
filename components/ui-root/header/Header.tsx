"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaShieldAlt, FaGithub, FaLinkedin, FaMedium, FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/navLinks";
import { socials } from "@/constants/commons/constants";
import NavLinkItem from "./NavLinkItem";
import LearnDropdown from "./LearnDropdown";
import ThemeDropdown from "./ThemeDropdown";
import LanguageDropdown from "./LanguageDropdown";
import { useLanguage } from "@/components/providers/I18nProvider";

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
  const { t } = useLanguage();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Close mobile popup on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    }
    if (isMobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileOpen]);

  // Close mobile popup on escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        setIsLearnOpen(false);
      }
    }
    if (isMobileOpen || isLearnOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen, isLearnOpen]);

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

  const toggleMobileMenu = () => {
    setIsLearnOpen(false);
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <>
      <header 
        className="fixed top-0 z-50 w-full border-b transition-colors duration-250 backdrop-blur-xl shadow-2xs"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--line)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-2">

            {/* Logo */}
            <Link href="/" className="text-xl sm:text-2xl font-extrabold tracking-tight shrink-0">
              <span
                className="bg-clip-text text-transparent transition-all duration-300 font-extrabold"
                style={{ backgroundImage: "var(--header-grad)" }}
              >
                YUVARAJ
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8">
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

            {/* Desktop Right Cluster (Theme + Language + Auth) */}
            <div className="hidden md:flex items-center gap-2.5">
              <LanguageDropdown />
              <ThemeDropdown />

              {authUser ? (
                <div className="flex items-center gap-2">
                  {(authUser.role === "admin" || authUser.role === "superuser") && (
                    <Link
                      href="/admin"
                      className="rounded-full border px-3 py-1.5 text-xs font-bold transition hover:opacity-90"
                      style={{
                        backgroundColor: "var(--signal-soft)",
                        borderColor: "var(--line)",
                        color: "var(--signal)",
                      }}
                    >
                      {t("nav.admin", "Admin")}
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition hover:border-[var(--signal)]"
                    title={`Signed in as ${authUser.username}`}
                  >
                    {authUser.profileImage ? (
                      <img
                        src={authUser.profileImage}
                        alt={authUser.fullName}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: "var(--signal)" }}
                      >
                        {authUser.fullName?.charAt(0).toUpperCase() || authUser.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="max-w-[120px] truncate font-semibold">@{authUser.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)] transition hover:text-[var(--ink)] cursor-pointer"
                  >
                    {t("nav.logout", "Logout")}
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="rounded-full px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90 shadow-2xs"
                  style={{
                    backgroundColor: "var(--signal)",
                    color: "var(--signal-text, #ffffff)",
                  }}
                >
                  {t("nav.login", "Login")}
                </Link>
              )}
            </div>

            {/* Mobile Right Cluster (Language + Learn + Theme + Hamburger) */}
            <div className="flex md:hidden items-center gap-1.5">
              <LanguageDropdown variant="mobile" />
              <LearnDropdown
                topics={topics}
                isOpen={isLearnOpen}
                onToggle={() => setIsLearnOpen((v) => !v)}
                onSelect={handleTopicSelect}
                variant="mobile"
              />
              <ThemeDropdown />
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] transition hover:border-[var(--signal)] active:scale-95"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Hamburger Floating Pop-up Modal ── */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-start justify-center p-3 pt-18">
          {/* Subtle backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Floating Pop-up Card */}
          <div
            ref={mobileMenuRef}
            className="relative z-10 w-full max-w-md rounded-3xl border p-5 shadow-2xl backdrop-blur-2xl transition-all max-h-[82vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--line)",
              color: "var(--ink)",
            }}
          >
            {/* Pop-up Header */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--signal)" }} />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  {t("nav.menu", "Menu & Navigation")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
                aria-label="Close menu"
              >
                <FaTimes size={12} />
              </button>
            </div>

            {/* Navigation Links Grid */}
            <div className="mt-3.5 grid gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const navKey = `nav.${link.label.toLowerCase()}`;
                const translatedLabel = t(navKey, link.label);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all border ${
                      isActive
                        ? "border-[var(--signal)] bg-[var(--surface)] shadow-2xs"
                        : "border-transparent hover:border-[var(--line)] hover:bg-[var(--surface)] text-[var(--ink)]"
                    }`}
                    style={{
                      color: isActive ? "var(--signal)" : undefined,
                    }}
                  >
                    <span>{translatedLabel}</span>
                    <span 
                      className="font-mono text-xs font-semibold transition-transform"
                      style={{ color: isActive ? "var(--signal)" : "var(--ink-soft)" }}
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* User Account / Profile Section in Mobile Pop-up */}
            <div className="mt-4 border-t border-[var(--line)] pt-4">
              {authUser ? (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3.5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-3">
                    {authUser.profileImage ? (
                      <img
                        src={authUser.profileImage}
                        alt={authUser.fullName}
                        className="h-10 w-10 rounded-full object-cover border border-[var(--line)]"
                      />
                    ) : (
                      <div 
                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-xs"
                        style={{ backgroundColor: "var(--signal)" }}
                      >
                        {authUser.fullName?.charAt(0).toUpperCase() || authUser.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="overflow-hidden flex-1">
                      <div className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] truncate">
                        {authUser.fullName || authUser.username}
                      </div>
                      <div className="text-xs text-[var(--ink-soft)] truncate font-mono">
                        @{authUser.username}
                      </div>
                    </div>
                    {authUser.role && (
                      <span 
                        className="rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider shrink-0"
                        style={{
                          backgroundColor: "var(--signal-soft)",
                          color: "var(--signal)",
                          borderColor: "var(--line)",
                        }}
                      >
                        {authUser.role}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--line)]">
                    {(authUser.role === "admin" || authUser.role === "superuser") && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-xs font-bold transition hover:opacity-90"
                        style={{ color: "var(--signal)" }}
                      >
                        <FaShieldAlt className="text-xs" />
                        <span>{t("nav.admin", "Admin")}</span>
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--signal)]"
                    >
                      <FaUserCircle className="text-xs text-[var(--ink-soft)]" />
                      <span>{t("nav.profile", "Account Profile")}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      <FaSignOutAlt className="text-xs" />
                      <span>{t("nav.logout", "Sign Out")}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold shadow-md transition hover:opacity-90"
                  style={{
                    backgroundColor: "var(--signal)",
                    color: "var(--signal-text, #ffffff)",
                  }}
                >
                  {t("nav.login", "Sign In / Join")}
                </Link>
              )}
            </div>

            {/* Quick Social Links inside Pop-up */}
            <div className="mt-4 border-t border-[var(--line)] pt-3.5 flex items-center justify-between px-2 text-[var(--ink-soft)]">
              <span className="text-[10px] font-mono">Connect</span>
              <div className="flex items-center gap-3.5">
                <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[var(--ink)] transition">
                  <FaGithub className="h-4 w-4" />
                </a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-500 transition">
                  <FaLinkedin className="h-4 w-4" />
                </a>
                <a href={socials.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium" className="hover:text-[var(--ink)] transition">
                  <FaMedium className="h-4 w-4" />
                </a>
                {socials.whatsapp && (
                  <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-emerald-500 transition">
                    <FaWhatsapp className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
