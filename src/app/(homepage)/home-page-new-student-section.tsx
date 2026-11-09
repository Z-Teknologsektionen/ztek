import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

const HomePageNewStudentSection = (): ReactElement => {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-2xl bg-zBlack p-8 sm:flex-row sm:p-10">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-zWhite sm:text-3xl">
            Ny student?
          </h2>
          <p className="mt-1 text-lg font-semibold text-zWhite">
            Eller kanske blivande?
          </p>
          <p className="mt-3 text-sm text-zLightGray">
            Det finns mängder av superbra tips till nya studenter på
            mottagningskommittens hemsida.
          </p>
          <Link
            className="mt-5 inline-block rounded-md bg-zBrown px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-zWhite hover:bg-zBlack"
            href="https://www.znollk.se/"
          >
            Länk till ZoKs hemsida
          </Link>
        </div>
        <Image
          alt="Illustration: lucky luke"
          className="h-40 w-80 shrink-0 rounded-lg object-scale-down"
          height={160}
          src="/lucky_horizontal.png"
          width={160}
        />
      </div>
    </section>
  );
};

export default HomePageNewStudentSection;
