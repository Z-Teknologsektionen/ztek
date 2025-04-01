import { unstable_cache } from "next/cache";
import { prisma } from "~/server/db";

export const getAllZenithMediaByYear = unstable_cache(
  async () => {
    const rawMedia = await prisma.zenithMedia.findMany({
      orderBy: { year: "desc" },
      select: {
        id: true,
        title: true,
        year: true,
        url: true,
        coverImage: true,
      },
    });

    const years = [...new Set(rawMedia.map((media) => media.year))];

    const formattedData = years.map((year) => {
      return {
        mediaArray: rawMedia.filter((media) => media.year === year),
        year: year,
      };
    });

    return formattedData;
  },
  undefined,
  { revalidate: false, tags: ["zenithMedia"] },
);
