import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

const HomePageSponsorSection = (): ReactElement => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-2 text-2xl font-extrabold text-zBlack">
          Sektionens huvudsponsor
        </h2>
        <div className="mx-auto mb-10 h-px w-full bg-zLightGray" />
        <Image
          alt="Logotyp: huvudsponsor"
          className="mx-auto h-40 w-full max-w-md rounded-lg"
          height={160}
          src="cpac.svg"
          width={320}
        />
        <p className="mt-6 text-sm text-zBlack">
          Ett stort tack till vår huvudsponsor CPAC Systems. Kolla gärna in
          deras hemsida för att läsa mer om deras verksamhet och vad de kan
          erbjuda dig som student.
        </p>
        <Link
          className="mt-6 inline-block rounded-md bg-zBrown px-5 py-2 text-sm font-semibold text-zWhite hover:bg-zBlack"
          href="https://cpacsystems.se/"
        >
          Mer om sponsorn
        </Link>
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl bg-zBlack p-6 sm:flex-row">
          <p className="text-sm text-zWhite sm:text-left">
            Vill er organisation sponsra eller samarbeta med oss? Mer
            information finns här:
          </p>
          <Link
            className="shrink-0 rounded-md bg-zBrown px-5 py-2.5 text-sm font-semibold text-zWhite hover:bg-zBlack"
            href="/business"
          >
            Läs mer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePageSponsorSection;
