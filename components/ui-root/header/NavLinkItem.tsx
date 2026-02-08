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
      ? "text-purple-400"
      : "text-slate-300 hover:text-white";

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
