import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { objectId } from "../helper/customZodTypes";

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
      })
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
      })
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
  getOneByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
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
          members: {
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
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: [{ order: "desc" }],
    });
  }),
  updateCommitteeAsUser: protectedProcedure
    .input(
      z.object({
        id: objectId,
        image: z.string().optional(),
        description: z.string().min(1).optional(),
      })
    )
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
  createCommittee: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().min(1),
        role: z.string().min(1),
        email: z.string().email().min(1),
        order: z.number().min(0).max(99),
        electionPeriod: z.number().min(1).max(4),
      })
    )
    .mutation(
      ({
        ctx,
        input: { description, email, name, order, role, slug, electionPeriod },
      }) => {
        return ctx.prisma.committee.create({
          data: {
            description,
            email,
            image: "",
            name,
            order,
            role,
            slug,
            electionPeriod,
          },
        });
      }
    ),
  updateCommittee: adminProcedure
    .input(
      z.object({
        id: objectId,
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        role: z.string().min(1).optional(),
        email: z.string().email().min(1).optional(),
        order: z.number().min(0).max(99).optional(),
        image: z.string().min(1).optional(),
        electionPeriod: z.number().min(1).max(4).optional(),
      })
    )
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
          },
        });
      }
    ),
  deleteCommittee: adminProcedure
    .input(
      z.object({
        id: objectId,
      })
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.committee.delete({
        where: {
          id,
        },
      });
    }),
});
