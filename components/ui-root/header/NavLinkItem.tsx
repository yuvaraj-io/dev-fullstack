import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function NavLinkItem({ href, label, onClick, className }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm font-medium transition ${
        isActive
          ? "text-violet-600"
          : "text-slate-600 hover:text-slate-900"
      } ${className ?? ""}`}
    >
      #{label}
    </Link>
  );
}
