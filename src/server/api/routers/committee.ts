import { z } from "zod";
import { objectId } from "~/server/api/helpers/customZodTypes";
import {
  createCommitteeSchema,
  updateCommitteeAsActiveSchema,
  updateCommitteeSchema,
} from "~/server/api/helpers/schemas/committees";
import {
  adminProcedure,
  createTRPCRouter,
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
  getOneBySlugAsAdmin: adminProcedure
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
          name: true,
          description: true,
          email: true,
          image: true,
          id: true,
          role: true,
          slug: true,
          updatedAt: true,
          order: true,
          electionPeriod: true,
          _count: {
            select: {
              members: true,
            },
          },
          members: {
            select: {
              name: true,
              nickName: true,
              role: true,
              image: true,
              email: true,
              phone: true,
              id: true,
              order: true,
              updatedAt: true,
            },
          },
        },
      });
    }),
  getOneByEmail: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(({ ctx, input: { email } }) => {
      return ctx.prisma.committee.findFirstOrThrow({
        where: {
          members: {
            some: {
              email: email,
            },
          },
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
            },
          },
        },
      });
    }),
  getAllAsAdmin: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.committee.findMany({
      select: {
        id: true,
        name: true,
        order: true,
        slug: true,
        electionPeriod: true,
        image: true,
        email: true,
        description: true,
        members: true,
        role: true,
      },
      orderBy: [{ order: "desc" }],
    });
  }),
  getAllCommitteeNamesAsAdmin: adminProcedure.query(({ ctx }) => {
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
  createCommittee: adminProcedure.input(createCommitteeSchema).mutation(
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
  updateCommittee: adminProcedure
    .input(updateCommitteeSchema)
    .mutation(
      ({
        ctx,
        input: {
          id,
          description,
          email,
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
            electionPeriod,
            link,
            linkText,
          },
        });
      },
    ),
  deleteCommittee: adminProcedure
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
