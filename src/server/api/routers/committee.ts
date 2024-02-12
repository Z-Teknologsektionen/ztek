import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";
import {
  createCommitteeSchema,
  updateCommitteeAsActiveSchema,
  updateCommitteeSchema,
} from "~/server/api/helpers/schemas/committees";
import {
  createTRPCRouter,
  organizationManagementProcedure,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const committeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.committee.findMany({
      orderBy: [{ order: "desc" }],
      select: {
        name: true,
        role: true,
        committeeType: true,
        slug: true,
        image: true,
        electionPeriod: true,
      },
    });
  }),
  getOneBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(({ ctx, input: { slug } }) => {
      return ctx.prisma.committee.findUniqueOrThrow({
        where: {
          slug: slug,
        },
        select: {
          id: true,
          name: true,
          description: true,
          email: true,
          image: true,
          electionPeriod: true,
          link: true,
          linkText: true,
          members: {
            where: {
              OR: [
                {
                  name: {
                    not: "",
                  },
                },
                {
                  nickName: {
                    not: "",
                  },
                },
              ],
            },
            orderBy: [{ order: "desc" }],
            select: {
              id: true,
              name: true,
              nickName: true,
              role: true,
              image: true,
              email: true,
              phone: true,
            },
          },
        },
      });
    }),
  getOneById: publicProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.committee.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          email: true,
          image: true,
          electionPeriod: true,
          link: true,
          linkText: true,
          members: {
            where: {
              OR: [
                {
                  name: {
                    not: "",
                  },
                },
                {
                  nickName: {
                    not: "",
                  },
                },
              ],
            },
            orderBy: [{ order: "desc" }],
            select: {
              id: true,
              name: true,
              nickName: true,
              role: true,
              image: true,
              email: true,
              phone: true,
            },
          },
        },
      });
    }),
  getOneByIdAsAuthed: protectedProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.committee.findFirstOrThrow({
        where: {
          id: id,
        },
        select: {
          name: true,
          description: true,
          email: true,
          image: true,
          id: true,
          electionPeriod: true,
          updatedAt: true,
          members: {
            orderBy: {
              order: "desc",
            },
            select: {
              id: true,
              name: true,
              nickName: true,
              email: true,
              image: true,
              role: true,
              updatedAt: true,
              order: true,
              phone: true,
            },
          },
        },
      });
    }),
  getAllAsAuthed: organizationManagementProcedure.query(async ({ ctx }) => {
    const committees = await ctx.prisma.committee.findMany({
      select: {
        id: true,
        name: true,
        order: true,
        slug: true,
        committeeType: true,
        electionPeriod: true,
        image: true,
        email: true,
        description: true,
        role: true,
        link: true,
        linkText: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: [{ order: "desc" }],
    });
    return committees.map(({ _count: { members: membersCount }, ...rest }) => ({
      membersCount,
      ...rest,
    }));
  }),
  getAllCommitteeNames: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.committee.findMany({
      select: {
        name: true,
      },
      orderBy: [{ order: "desc" }],
    });
  }),
  updateCommitteeAsUser: protectedProcedure
    .input(updateCommitteeAsActiveSchema)
    .mutation(({ ctx, input: { id, description, image } }) => {
      return ctx.prisma.committee.update({
        where: {
          id,
        },
        data: {
          description,
          image,
        },
      });
    }),
  createCommitteeAsAuthed: organizationManagementProcedure
    .input(createCommitteeSchema)
    .mutation(
      ({
        ctx,
        input: {
          description,
          email,
          name,
          order,
          role,
          slug,
          image,
          electionPeriod,
          linkObject: { link, linkText },
        },
      }) => {
        return ctx.prisma.committee.create({
          data: {
            description,
            email,
            image,
            name,
            order,
            role,
            slug,
            electionPeriod,
            link,
            linkText,
          },
          select: {
            name: true,
          },
        });
      },
    ),
  updateCommitteeAsAuthed: organizationManagementProcedure
    .input(updateCommitteeSchema)
    .mutation(
      ({
        ctx,
        input: {
          id,
          description,
          email,
          committeeType,
          name,
          order,
          role,
          slug,
          image,
          electionPeriod,
          linkObject: { link, linkText } = {},
        },
      }) => {
        return ctx.prisma.committee.update({
          where: {
            id,
          },
          data: {
            description,
            email,
            image,
            name,
            order,
            role,
            slug,
            committeeType,
            electionPeriod,
            link,
            linkText,
          },
        });
      },
    ),
  deleteCommitteeAsAuthed: organizationManagementProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.committee.delete({
        where: {
          id,
        },
      });
    }),
});
