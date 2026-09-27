import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Z",
};

import {
  BarChart3,
  Building2,
  Camera,
  Database,
  FileText,
  LogIn,
  Settings,
  Users,
} from "lucide-react";
import PlaceholderImage from "./_components_new/placeholder_image";
import QuickLink from "./_components_new/quicklink";
import UpcomingEventsCard from "./_components_new/upcoming_events_card";

function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-200 to-neutral-400 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <Settings size={40} strokeWidth={1.5} className="mb-4 text-neutral-600" />
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
                href="#"
                className="rounded-md bg-amber-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-900"
              >
                Mer om programmet
              </a>
              <a
                href="#"
                className="rounded-md border border-neutral-500 bg-white/60 px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-white"
              >
                För företag
              </a>
            </div>

            {/* Snabblänkar */}
            <div className="mt-10 rounded-2xl bg-white p-5 shadow-xl">
              <h2 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-neutral-700">
                Snabblänkar
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <QuickLink icon={Building2} label="Zaloonen bokning" link="/student-division/zaloonen#bookings" target="" rel="" />
                <QuickLink icon={Users} label="Sektionsorgan" link="/student-division/committees" target="" rel="" />
                <QuickLink icon={FileText} label="Dokument" link="/documents" target="" rel="" />
                <QuickLink icon={Camera} label="Z-foto" link="https://zfoto.ztek.se" target="_blank" rel="noopener noreferrer" />
                <QuickLink icon={LogIn} label="Logga in" link="/active" target="" rel="" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="rounded-2xl bg-white p-4 shadow-xl lg:p-5">
            <PlaceholderImage
              label="Foto: sektionsmiddag"
              className="aspect-[4/3] w-full rounded-lg"
            />
            <UpcomingEventsCard />
          </div>
        </div>
      </section>

      {/* Ny student */}
      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-2xl bg-neutral-700 p-8 sm:flex-row sm:p-10">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Ny student?</h2>
            <p className="mt-1 text-lg font-semibold text-white">Eller kanske blivande?</p>
            <p className="mt-3 text-sm text-neutral-300">
              Det finns mängder av superbra tips till nya studenter på mottagningskommittens
              hemsida.
            </p>
            <a
              href="#"
              className="mt-5 inline-block rounded-md bg-amber-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-amber-900"
            >
              Länk till ZoKs hemsida
            </a>
          </div>
          <PlaceholderImage
            label="Illustration: mottagningen"
            className="h-40 w-40 shrink-0 rounded-lg"
          />
        </div>
      </section>

      {/* Sponsor */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-2 text-2xl font-extrabold text-neutral-900">
            Sektionens huvudsponsor
          </h2>
          <div className="mx-auto mb-10 h-px w-full bg-neutral-300" />
          <PlaceholderImage
            label="Logotyp: huvudsponsor"
            className="mx-auto h-40 w-full max-w-md rounded-lg"
          />
          <a
            href="#"
            className="mt-6 inline-block rounded-md bg-teal-800 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-900"
          >
            Mer om sponsorn
          </a>
        </div>
      </section>

      {/* Externa resurser */}
      <section className="bg-neutral-700 px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-2 text-2xl font-extrabold text-white">Externa resurser</h2>
          <div className="mx-auto mb-8 h-px w-full bg-neutral-500" />
          <div className="grid grid-cols-2 gap-4 sm:mx-auto sm:max-w-md">
            <a
              href="#"
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 hover:bg-neutral-100"
            >
              <Database size={28} strokeWidth={1.5} className="text-neutral-700" />
              <span className="text-sm font-semibold text-neutral-800">Ladok</span>
            </a>
            <a
              href="#"
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 hover:bg-neutral-100"
            >
              <BarChart3 size={28} strokeWidth={1.5} className="text-neutral-700" />
              <span className="text-sm font-semibold text-neutral-800">Tentastatistik</span>
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default HomePage;
