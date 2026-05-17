import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function NavLinkItem({
  href,
  label,
  onClick,
  className,
}: Props) {
  const pathname = usePathname();

  const stateClassName =
    pathname === href
      ? "text-blue-700"
      : "text-slate-600 hover:text-slate-950";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${stateClassName} ${className ?? ""}`}
    >
      #{label}
    </Link>
  );
}
