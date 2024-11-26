import type { Metadata } from "next";
import { Suspense, type FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import {
  ZenithMediaGrid,
  ZenithMediaGridSkeleton,
} from "./_components/zenith-media-grid";

export const metadata: Metadata = {
  title: "Zenith media",
  description: "Nedan finner du media som Zenith producerat!",
};

const ZenithMediaPage: FC = () => {
  return (
    <SectionWrapper>
      <div>
        <SectionTitle>Zenith Media</SectionTitle>
        <p className="max-w-3xl">
          Nedan finner du media som Zenith producerat!
        </p>
      </div>
      <Suspense fallback={<ZenithMediaGridSkeleton />}>
        <ZenithMediaGrid />
      </Suspense>
    </SectionWrapper>
  );
};

export default ZenithMediaPage;
