import Link from "next/link";
import type { FC } from "react";

export const HomePageLinkTile: FC<{
  href: string;
  title: string;
}> = ({ href, title }) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      className="group overflow-hidden rounded-[1.5rem] border border-white/15 bg-zBlack/70 shadow-lg transition-all duration-200 hover:border-white/25 hover:-translate-y-1"
      href={href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      <div className="flex aspect-[4/3] items-end justify-start bg-gradient-to-br from-slate-700 via-zinc-800 to-slate-900 p-4">
        <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80">
          {title}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/70">
          {isExternal ? "Extern länk" : "Intern länk"}
        </p>
      </div>
    </Link>
  );
};
