import { TooltipProvider } from "@radix-ui/react-tooltip";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import HeadLayout from "~/components/layout/head-layout";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import ssg from "~/server/api/helpers/ssg";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type IZenithMediaCard =
  RouterOutputs["zenithMedia"]["getAllByYear"][0]["mediaArray"][0];

export const ZenithMediaCard: FC<IZenithMediaCard> = ({
  coverImage,
  title,
  url,
  year,
}) => {
  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url} rel="noopener noreferrer" target="_blank">
            <Image
              alt={`Omslagsbild till ${title}`}
              className="h-[187.5px] w-full object-contain object-center"
              height={187.5}
              src={coverImage}
              unselectable="on"
              width={125}
              unoptimized
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {title}, {year}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ZenithMediaPage: NextPage = () => {
  const { data, isLoading, isError } = api.zenithMedia.getAllByYear.useQuery(
    undefined,
    {},
  );

  return (
    <>
      <HeadLayout title="Zenith media" />
      <SectionWrapper>
        <div>
          <SectionTitle>Zenith Media</SectionTitle>
          <p className="max-w-3xl">
            Nedan finner du media som Zenith producerat!
          </p>
        </div>

        {isLoading &&
          Array.from({ length: 4 }).map((_, groupIdx) => (
            <div key={`zenith-skeleton-${groupIdx}`} className="space-y-4">
              <Skeleton className="h-7" />
              <div className="flex flex-row flex-wrap gap-4">
                {Array.from({ length: 4 }).map((__, cardIdx) => (
                  <Skeleton
                    key={`zenith-skeleton-card-${cardIdx}`}
                    className="h-[187.5px] w-[125px]"
                  />
                ))}
              </div>
            </div>
          ))}
        {(isError || data?.length === 0) && (
          <p>
            Ett okänt fel har inträffat, försök igen senare eller kontakta
            webbgruppen!
          </p>
        )}
        {data &&
          data.length > 0 &&
          data.map(({ year, mediaArray }) => (
            <div key={year} className="space-y-4">
              <SecondaryTitle>{year}</SecondaryTitle>
              <div className="flex flex-row flex-wrap gap-4">
                {mediaArray.length > 0 &&
                  mediaArray.map((media) => (
                    <ZenithMediaCard key={media.id} {...media} />
                  ))}
              </div>
            </div>
          ))}
      </SectionWrapper>
    </>
  );
};

export default ZenithMediaPage;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.zenithMedia.getAllByYear.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
