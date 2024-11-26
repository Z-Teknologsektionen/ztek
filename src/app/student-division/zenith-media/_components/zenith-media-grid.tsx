import type { FC } from "react";
import { getAllZenithMediaByYear } from "~/app/student-division/zenith-media/_utils/get-all-zenith-media-by-year";
import SecondaryTitle from "~/components/layout/secondary-title";
import { Skeleton } from "~/components/ui/skeleton";
import { ZenithMediaCard } from "./zenith-media-card";

export const ZenithMediaGrid: FC = async () => {
  const zenihMedia = await getAllZenithMediaByYear();

  return (
    <>
      {zenihMedia &&
        zenihMedia.length > 0 &&
        zenihMedia.map(({ year, mediaArray }) => (
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
