import { type FC } from "react";
import { HomePageHeroCarousel } from "./home-page-hero-carousel";
import { HomePageHeroLinks } from "./home-page-hero-links";
import { HomePageHeroSponsors } from "./home-page-hero-sponsors";

export const HomePageHeroSection: FC = () => {
  return (
    <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-4 px-6 py-4 md:grid md:grid-cols-2 md:gap-6 md:px-4 xl:px-2 2xl:px-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-balance text-center text-3xl font-semibold">
          Välkommen till Automation och Mekatronik!
        </h1>
        <p className="text-center text-sm font-light lg:text-base">
          Z-teknologsektionen, eller Z som programmet kallas, är
          civilingengörsprogrammet på Chalmers tekniska högskola som beskrivs
          som länken mellan maskin-, elektro och datateknik.
        </p>
      </div>
      <div className="flex flex-col gap-2 md:row-span-3">
        <HomePageHeroCarousel />
        <HomePageHeroLinks />
      </div>
      <HomePageHeroSponsors />
    </div>
  );
};
