import type { Metadata } from "next";
import Image from "next/image";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Z",
};

import { Settings } from "lucide-react";
import { getHomePageCarouselItems } from "~/app/(homepage)/_utils/get-home-page-carousel-items";
import ExternalLinks from "./_components_new/external_links";
import QuickLinks from "./_components_new/quick_links";
import UpcomingEventsCard from "./_components_new/upcoming_events_card";
import { HomePageHeroCarousel } from "./_components_old/home-page-hero-carousel";

const HomePage = async (): Promise<ReactElement> => {
  const carouselItems = await getHomePageCarouselItems();

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-200 to-neutral-400 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <Settings
              size={40}
              strokeWidth={1.5}
              className="mb-4 text-neutral-600"
            />
            <h1 className="text-4xl font-extrabold text-neutral-900 sm:text-5xl">
              Z-teknologsektionen
            </h1>
            <p className="mt-3 text-base text-neutral-700">
              Automation och mekatronik
              <br />
              på Chalmers tekniska högskola
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/student"
                className="rounded-md bg-amber-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-900"
              >
                Mer om programmet
              </a>
              <a
                href="/business"
                className="rounded-md border border-neutral-500 bg-white/60 px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-white"
              >
                För företag
              </a>
            </div>

            <QuickLinks />
          </div>

          {/* Right column */}
          <div className="rounded-2xl bg-white p-4 shadow-xl lg:p-5">
            {carouselItems.length > 0 ? (
              <HomePageHeroCarousel items={carouselItems} />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-lg bg-neutral-200 px-6 text-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
                    Nytt i veckan
                  </p>
                  <p className="mt-3 text-xl font-semibold text-neutral-800">
                    Mer innehåll kommer snart att visas här.
                  </p>
                </div>
              </div>
            )}
            <UpcomingEventsCard />
          </div>
        </div>
      </section>

      {/* Sponsor */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-2 text-2xl font-extrabold text-neutral-900">
            Sektionens huvudsponsor
          </h2>
          <div className="mx-auto mb-10 h-px w-full bg-neutral-300" />
          <Image
            src="cpac.svg"
            alt="Logotyp: huvudsponsor"
            width={320}
            height={160}
            className="mx-auto h-40 w-full max-w-md rounded-lg"
          />
          <p className="mt-6 text-sm text-neutral-700">
            Ett stort tack till vår huvudsponsor CPAC Systems. Kolla gärna in deras hemsida för att läsa mer om deras verksamhet och vad de kan erbjuda dig som student.
          </p>
          <a
            href="https://cpacsystems.se/"
            className="mt-6 inline-block rounded-md bg-teal-800 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-900"
          >
            Mer om sponsorn
          </a>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl bg-neutral-700 p-6 sm:flex-row">
            <p className="text-sm text-white sm:text-left">
              Vill er organisation sponsra eller samarbeta med oss? Mer
              information finns här:
            </p>
            <a
              href="/business"
              className="shrink-0 rounded-md bg-amber-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-900"
            >
              Läs mer
            </a>
          </div>
          <div className="mx-auto mb-10 h-px w-full bg-neutral-300 mt-20"/>
        </div>
      </section>

      {/* Ny student */}
      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-2xl bg-neutral-700 p-8 sm:flex-row sm:p-10">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ny student?
            </h2>
            <p className="mt-1 text-lg font-semibold text-white">
              Eller kanske blivande?
            </p>
            <p className="mt-3 text-sm text-neutral-300">
              Det finns mängder av superbra tips till nya studenter på
              mottagningskommittens hemsida.
            </p>
            <a
              href="https://www.znollk.se/"
              className="mt-5 inline-block rounded-md bg-amber-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-amber-900"
            >
              Länk till ZoKs hemsida
            </a>
          </div>
          <Image
            src="/lucky_horizontal.png"
            alt="Illustration: lucky luke"
            width={160}
            height={160}
            className="h-40 w-80 shrink-0 rounded-lg object-scale-down"
          />
        </div>
      </section>

      

      <ExternalLinks />
    </div>
  );
};

export default HomePage;
