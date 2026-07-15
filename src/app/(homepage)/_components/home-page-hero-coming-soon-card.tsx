import { CalendarDays } from "lucide-react";
import type { FC } from "react";

export const HomePageHeroComingSoonCard: FC = () => {
  return (
    <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70">
            Kalender
          </p>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Kommer snart
          </h2>
        </div>
        <div className="rounded-full border border-white/20 bg-zBlack/50 px-3 py-1 text-sm font-medium text-white/80">
          Preview
        </div>
      </div>

      <div className="rounded-[1.25rem] border border-dashed border-white/30 bg-zBlack/40 p-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
          <CalendarDays className="h-7 w-7" />
        </div>
        <p className="mt-4 text-lg font-semibold text-white">
          Kalendern är under uppbyggnad
        </p>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Vi laddar snart upp evenemang, deadlines och viktiga datum i en enkel
          översikt.
        </p>
      </div>
    </div>
  );
};
