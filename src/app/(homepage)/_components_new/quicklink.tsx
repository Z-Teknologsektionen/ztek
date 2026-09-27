import type { LucideIcon } from "lucide-react";

interface QuickLinkProps {
  icon: LucideIcon;
  label: string;
  link: string;
  target: string;
  rel: string;
}

export default function QuickLink({ icon: Icon, label, link, target, rel }: QuickLinkProps) {
  return (
    <a
      href={link}
      target={target}
      rel={rel}
      className="flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-700 px-4 py-5 text-center text-white transition-colors hover:bg-neutral-600"
    >
      <Icon size={22} strokeWidth={1.75} />
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}