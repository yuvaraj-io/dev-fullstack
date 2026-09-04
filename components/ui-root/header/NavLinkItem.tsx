"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/providers/I18nProvider";

type Props = {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function NavLinkItem({ href, label, onClick, className }: Props) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isActive = pathname === href;
  const navKey = `nav.${label.toLowerCase()}`;
  const translatedLabel = t(navKey, label);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm font-medium transition ${
        isActive
          ? "font-bold"
          : "opacity-80 hover:opacity-100"
      } ${className ?? ""}`}
      style={{
        color: isActive ? "var(--signal)" : "var(--ink)",
      }}
    >
      #{translatedLabel}
    </Link>
  );
}

