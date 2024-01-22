import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import ssg from "~/server/api/helpers/ssg";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type IZenithDocumentCard =
  RouterOutputs["zenithDocuments"]["getAllByYear"][0]["documents"][0];

export const ZenithDocumentCard: FC<IZenithDocumentCard> = ({
  image,
  isPDF,
  title,
  url,
  year,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className="relative h-[187.5px] w-[125px]"
          href={isPDF ? `https://docs.google.com/viewer?url=${url}` : url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt={`Omslagsbild till ${title}`}
            className="object-cover object-center"
            src={image}
            unselectable="on"
            fill
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
  );
};

const ZenithMediaPage: NextPage = () => {
  const { data, isLoading, isError } =
    api.zenithDocuments.getAllByYear.useQuery(undefined, {});

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
        <TooltipProvider>
          {data &&
            data.length > 0 &&
            data.map(({ year, documents }) => (
              <div key={year} className="space-y-4">
                <SecondaryTitle>{year}</SecondaryTitle>
                <div className="flex flex-row flex-wrap gap-4">
                  {documents.length > 0 &&
                    documents.map((document) => (
                      <ZenithDocumentCard key={document.id} {...document} />
                    ))}
                </div>
              </div>
            ))}
        </TooltipProvider>
      </SectionWrapper>
    </>
  );
};

export default ZenithMediaPage;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.zenithDocuments.getAllByYear.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
