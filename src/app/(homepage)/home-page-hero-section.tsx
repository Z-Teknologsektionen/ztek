import { cacheTag } from "next/cache";
import Link from "next/link";
import type { ReactElement } from "react";
import { Settings } from "lucide-react";
import { cacheableCaller } from "~/utils/trpc-client/caller";
import HomePageCalendar from "./home-page-calendar";
import { HomePageHeroCarousel } from "./home-page-hero-carousel";
import QuickLinks from "./quick-links";

const HomePageHeroSection = async (): Promise<ReactElement> => {
  const carouselItems = await (async () => {
    "use cache";
    cacheTag("home-page-carousel");
    return await cacheableCaller.homePageCarousel.getAllVisible();
  })();

  return (
    <section className="bg-gradient-to-br from-cardBackground to-zLightGray px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <Settings
            className="mb-4 text-zDarkGray"
            size={40}
            strokeWidth={1.5}
          />
          <h1 className="text-4xl font-extrabold text-zBlack sm:text-5xl">
            Z-teknologsektionen
          </h1>
          <p className="mt-3 text-base text-zBlack">
            Automation och mekatronik
            <br />
            på Chalmers tekniska högskola
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-md bg-zBrown px-5 py-2.5 text-sm font-semibold text-zWhite hover:bg-zBlack"
              href="/student"
            >
              Mer om programmet
            </Link>
            <Link
              className="rounded-md border border-zDarkGray bg-zWhite/60 px-5 py-2.5 text-sm font-semibold text-zBlack hover:bg-zWhite"
              href="/business"
            >
              För företag
            </Link>
          </div>

          <QuickLinks />
        </div>

        <div className="rounded-2xl bg-zWhite p-4 shadow-xl lg:p-5">
          {carouselItems.length > 0 ? (
            <HomePageHeroCarousel items={carouselItems} />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-cardBackground px-6 text-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-zDarkGray">
                  Bildkarusell
                </p>
                <p className="mt-3 text-xl font-semibold text-zBlack">
                  Hoppsan hejsan! Någon har glömt att ladda upp bilder här
                </p>
              </div>
            </div>
          )}
          <HomePageCalendar />
        </div>
      </div>
    </section>
  );
};

export default HomePageHeroSection;
