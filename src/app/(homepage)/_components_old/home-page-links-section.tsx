import { type FC } from "react";
import { homePageGroupedLinks } from "~/data/home-page-grouped-links";
import { HomePageLinkTile } from "./home-page-link-tile";

export const HomePageLinksSection: FC = () => {
  return (
    <div
      className="relative flex w-full items-center justify-center bg-cover bg-center object-cover py-24 drop-shadow-xl [clip-path:polygon(0%_5%,100%_0%,100%_100%,0%_100%)] md:py-32 md:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)] xl:py-36 xl:[clip-path:polygon(0%_15%,100%_0%,100%_100%,0%_100%)]"
      style={{ backgroundImage: "url(./wallpaper_automation.jpg)" }}
    >
      <div className="absolute inset-0 bg-zBlack/50" />
      <div className="relative m-auto flex h-full max-w-[85rem] flex-col justify-center gap-6 px-4 sm:px-6 lg:px-8">
        {homePageGroupedLinks.map((group) => (
          <div
            key={group.title}
            className="rounded-[1.5rem] border border-white/15 bg-zBlack/55 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6"
          >
            <div className="mb-4 text-2xl font-bold text-white drop-shadow-xl">
              {group.title}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.links.map((link) => (
                <HomePageLinkTile
                  key={link.url}
                  href={link.url}
                  title={link.title}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
