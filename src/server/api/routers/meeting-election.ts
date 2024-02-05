import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";
import {
  createZenithMediaSchema,
  updateZenithMediaSchema,
} from "~/server/api/helpers/schemas/zenith-media";
import { createTRPCRouter, zenithMediaProcedure } from "~/server/api/trpc";

export const meetingElectionRouter = createTRPCRouter({
  createOne: zenithMediaProcedure
    .input(createZenithMediaSchema)
    .mutation(async ({ ctx, input: { isPDF, title, url, year, image } }) => {
      return ctx.prisma.zenithMedia.create({
        data: {
          title: title,
          isPDF: isPDF,
          url: url,
          year: year,
          image: image,
        },
      });
    }),
  updateOne: zenithMediaProcedure
    .input(updateZenithMediaSchema)
    .mutation(
      async ({ ctx, input: { id, isPDF, title, url, year, image } }) => {
        return ctx.prisma.zenithMedia.update({
          where: {
            id: id,
          },
          data: {
            isPDF: isPDF,
            title: title,
            url: url,
            year: year,
            image: image,
          },
        });
      },
    ),
  deleteOne: zenithMediaProcedure
    .input(z.object({ id: objectId }))
    .mutation(async ({ ctx, input: { id } }) => {
      return ctx.prisma.zenithMedia.delete({
        where: {
          id: id,
        },
      });
    }),
});
