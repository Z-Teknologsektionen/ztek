import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const documentRouter = createTRPCRouter({
  getAllSortedByGroup: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.documentGroup.findMany({
      select: {
        name: true,
        extraTextJson: true,
        Document: {
          select: {
            id: true,
            isPDF: true,
            title: true,
            url: true,
          },
        },
      },
    });
  }),
  getAllAsAdmin: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.document.findMany({
      select: {
        group: {
          select: {
            name: true,
          },
        },
        id: true,
        isPDF: true,
        title: true,
        url: true,
      },
    });
  }),
  getAllGroupsAsAdmin: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.documentGroup.findMany({
      select: {
        name: true,
        extraTextJson: true,
        _count: {
          select: {
            Document: true,
          },
        },
      },
    });
  }),
});
