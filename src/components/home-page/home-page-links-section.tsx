import Link from "next/link";
import { type FC } from "react";
import { homePageGroupedLinks } from "~/data/home-page-grouped-links";

const HomePageLinksSection: FC = () => {
  return (
    <div
      className="relative flex w-full items-center justify-center bg-cover bg-center object-cover py-32 drop-shadow-xl [clip-path:polygon(0%_5%,100%_0%,100%_100%,0%_100%)] md:[clip-path:polygon(0%_10%,100%_0%,100%_100%,0%_100%)] xl:[clip-path:polygon(0%_15%,100%_0%,100%_100%,0%_100%)] "
      style={{ backgroundImage: "url(./wallpaper_automation.jpg)" }}
    >
      <div className="m-auto flex h-full max-w-[85rem] flex-col justify-center gap-10 px-4 sm:px-6 lg:px-8">
        {homePageGroupedLinks.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-white drop-shadow-xl">
              {group.title}
            </div>
            <div className="flex flex-wrap gap-4 ">
              {group.links.map((link) => (
                <Link
                  key={link.url}
                  className="rounded-bl-lg rounded-tr-lg border-2 bg-zBlack bg-opacity-60 px-2 py-1 text-center align-middle text-base font-bold text-white transition-all duration-200 hover:rounded-br-lg hover:rounded-tl-lg md:w-auto md:px-3 md:text-lg xl:px-5  xl:text-xl"
                  href={link.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageLinksSection;
