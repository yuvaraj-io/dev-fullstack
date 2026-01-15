import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  onClick?: () => void;
};

export default function NavLinkItem({ href, label, onClick }: Props) {
  const pathname = usePathname();

  const className =
    pathname === href
      ? "text-purple-400"
      : "text-slate-300 hover:text-white";

  return (
    <Link href={href} onClick={onClick} className={className}>
      #{label}
    </Link>
  );
}
