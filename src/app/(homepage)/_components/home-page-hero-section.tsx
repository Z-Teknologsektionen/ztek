import { type FC } from "react";
import { getHomePageCarouselItems } from "~/app/(homepage)/_utils/get-home-page-carousel-items";
import { HomePageHeroCarousel } from "./home-page-hero-carousel";
import { HomePageHeroLinks } from "./home-page-hero-links";
import { HomePageHeroSponsors } from "./home-page-hero-sponsors";

export const HomePageHeroSection: FC = async () => {
  const carouselItems = await getHomePageCarouselItems();

  return (
    <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-4 px-6 py-4 md:grid md:grid-cols-2 md:gap-8 md:px-4 xl:px-2 2xl:px-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-balance text-center align-text-bottom text-xl font-bold md:text-left md:text-2xl xl:text-4xl">
          Välkommen till <br className="hidden md:block" />
          Automation och Mekatronik <br />
          på Chalmers tekniska högskola!
        </h1>
        <p className="text-balance text-center text-sm md:text-left md:text-base lg:text-base xl:text-xl">
          Z-teknologsektionen är till för chalmersstudenter som studerar
          Automation och mekatronik, eller Z som det också kallas. Programmet
          beskrivs som länken mellan maskin-, elektro- och datateknik.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:row-span-3 md:gap-2">
        <HomePageHeroCarousel items={carouselItems} />
        <HomePageHeroLinks />
      </div>
      <HomePageHeroSponsors />
    </div>
  );
};
