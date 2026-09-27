import { Sparkles } from "lucide-react";
import type { FC } from "react";
import { homePageSelectLinks } from "~/data/home-page-select-links";
import { HomePageLinkTile } from "./home-page-link-tile";

export const HomePageHeroSpotlight: FC = () => {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-zBlack/60 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
        <Sparkles className="h-4 w-4" />
        Snabbåtkomst
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {homePageSelectLinks.map((link) => (
          <HomePageLinkTile key={link.url} href={link.url} title={link.title} />
        ))}
      </div>
    </div>
  );
};
