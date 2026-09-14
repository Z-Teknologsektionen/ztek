import { cacheTag } from "next/cache";
import type { FC } from "react";
import SecondaryTitle from "~/components/layout/secondary-title";
import { Skeleton } from "~/components/ui/skeleton";
import { cacheableCaller } from "~/utils/trpc-client/caller";
import { ZenithMediaCard } from "./zenith-media-card";

export const ZenithMediaGrid: FC = async () => {
  const zenithMedia = await (async () => {
    "use cache";
    cacheTag("zenithMedia");
    return await cacheableCaller.zenithMedia.getAllVisibleGroupedByYear();
  })();

  return (
    <>
      {zenithMedia &&
        zenithMedia.length > 0 &&
        zenithMedia.map(({ year, mediaArray }) => (
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
    </>
  );
};

export const ZenithMediaGridSkeleton: FC = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, groupIdx) => (
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
    </>
  );
};
