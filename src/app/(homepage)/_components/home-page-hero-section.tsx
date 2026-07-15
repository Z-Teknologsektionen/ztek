import { ArrowRight, Sparkles } from "lucide-react";
import type { ReactElement } from "react";
import { getHomePageCarouselItems } from "~/app/(homepage)/_utils/get-home-page-carousel-items";
import { HomePageHeroCarousel } from "./home-page-hero-carousel";
import { HomePageHeroComingSoonCard } from "./home-page-hero-coming-soon-card";
import { HomePageHeroSponsors } from "./home-page-hero-sponsors";
import { HomePageHeroSpotlight } from "./home-page-hero-spotlight";

export const HomePageHeroSection = async (): Promise<ReactElement> => {
  const carouselItems = await getHomePageCarouselItems();

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_35%),linear-gradient(135deg,_rgba(9,9,11,0.95)_0%,_rgba(43,43,53,0.9)_45%,_rgba(135,140,150,0.9)_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(92,255,168,0.12),_transparent_30%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-6">
        <div className="flex flex-col gap-5">
          <div className="rounded-[2rem] border border-white/15 bg-zBlack/60 p-6 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-8 h-full">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
              <Sparkles className="h-4 w-4" />
              Studentsektionen Z
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl">
              Allt du behöver för studier, campus och sektionen.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Hitta snabbt viktiga länkar, följ med i senaste nyheterna och få en
              översikt över vad som väntar på sektionen.
            </p>
          </div>
          <HomePageHeroSpotlight />
        </div>

        <div className="flex flex-col gap-5 lg:col-start-2">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-zBlack/60 p-4 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                Nyheter & kalender
              </p>
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Live
              </div>
            </div>
            <div className="grid gap-4 lg:grid-rows-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10">
                {carouselItems.length > 0 ? (
                  <HomePageHeroCarousel items={carouselItems} />
                ) : (
                  <div className="flex min-h-[18rem] items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_60%)] px-6 text-center">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                        Nytt i veckan
                      </p>
                      <p className="mt-3 text-xl font-semibold text-white">
                        Mer innehåll kommer snart att visas här.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <HomePageHeroComingSoonCard />
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                Samarbeten
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                Mer info
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <HomePageHeroSponsors />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
