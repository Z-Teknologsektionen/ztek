import Link from "next/link";
import type { FC } from "react";
import { homePageSelectLinks } from "~/data/home-page-select-links";

export const HomePageHeroLinks: FC = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 md:justify-end">
      {homePageSelectLinks.map((link) => (
        <Link
          key={link.url}
          className="h-fit w-full rounded-bl-lg rounded-tr-lg border-2 border-zBlack px-1 py-1 text-center align-middle text-base font-bold transition-all duration-200 hover:rounded-br-lg hover:rounded-tl-lg md:w-auto md:px-3 md:text-lg xl:px-5 xl:text-xl"
          href={link.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};
