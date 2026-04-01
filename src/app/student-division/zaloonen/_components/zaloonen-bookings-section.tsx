import Link from "next/link";
import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { buttonVariants } from "~/components/ui/button";

export const ZaloonenBookingsSection: FC = () => (
  <SectionWrapper>
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div>
        <SectionTitle>Bokningar</SectionTitle>
        <p className="mt-1 text-sm font-light">
          Här är Zaloonens bokningskalender. Observera att formuläret bara är en
          intresseanmälan.
        </p>
      </div>
      <Link
        className={buttonVariants({
          className: "w-full bg-gray-200 uppercase sm:w-auto",
          size: "lg",
          variant: "outline",
        })}
        href="https://docs.google.com/forms/d/e/1FAIpQLSehZ_u-t8Gu067sr_DmY5edTgdmTQSORCEqYI5EdRLLpJ3NJw/viewform"
        rel="noopener noreferrer"
        target="_blank"
      >
        Boka Zaloonen!
      </Link>
    </div>
    <iframe
      className="mx-auto -mt-8 mb-8 aspect-video h-[100vh] w-full max-w-3xl overscroll-auto"
      seamless={true}
      src="https://embed.styledcalendar.com/#KwrikxxDh0q9078hGAzF"
      style={{ overflow: "hidden" }}
      title="zaloonenCal"
    />
  </SectionWrapper>
);
