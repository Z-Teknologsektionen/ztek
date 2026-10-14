import Link from "next/link";
import type { IconType } from "react-icons";

interface QuickLinkProps {
  icon: IconType;
  label: string;
  link: string;
  target: string;
  rel: string;
}

export default function QuickLink({ icon: Icon, label, link, target, rel }: QuickLinkProps) {
  return (
    <Link
      href={link}
      target={target}
      rel={rel}
      className="flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-700 px-4 py-5 text-center text-white transition-colors hover:bg-neutral-600"
    >
      <Icon size={22} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}