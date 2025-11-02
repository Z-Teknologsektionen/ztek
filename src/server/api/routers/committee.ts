import { revalidateTag } from "next/cache";
import { z } from "zod";
import {
  createCommitteeSchema,
  updateCommitteeAsActiveSchema,
  updateCommitteeSchema,
} from "~/schemas/committee";
import { objectId, slugString } from "~/schemas/helpers/custom-zod-helpers";
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
        electionPeriods: true,
      },
    });
  }),
  getOneBySlug: publicProcedure
    .input(
      z.object({
        slug: slugString,
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
          electionPeriods: true,
          socialLinks: true,
          document: {
            select: {
              url: true,
              isPDF: true,
            },
          },
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
  getOneByIdAsActive: protectedProcedure
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
          electionPeriods: true,
          updatedAt: true,
          socialLinks: true,
          role: true,
          document: true,
          showOldCommittee: true,
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
        electionPeriods: true,
        image: true,
        email: true,
        description: true,
        role: true,
        socialLinks: true,
        documentId: true,
        showOldCommittee: true,
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
  getAllCommitteeNamesAsActive: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.committee.findMany({
      select: {
        name: true,
        id: true,
      },
      orderBy: [{ order: "desc" }],
    });
  }),
  updateCommitteeAsActive: protectedProcedure
    .input(updateCommitteeAsActiveSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedCommittee = await ctx.prisma.committee.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedByEmail: ctx.session.user.email,
        },
      });

      revalidateTag("committee");

      return updatedCommittee;
    }),
  createCommitteeAsAuthed: organizationManagementProcedure
    .input(createCommitteeSchema)
    .mutation(async ({ ctx, input }) => {
      const createdCommittee = await ctx.prisma.committee.create({
        data: {
          ...input,
          updatedByEmail: ctx.session.user.email,
          createdByEmail: ctx.session.user.email,
        },
        select: {
          name: true,
        },
      });

      revalidateTag("committee");

      return createdCommittee;
    }),
  updateCommitteeAsAuthed: organizationManagementProcedure
    .input(updateCommitteeSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedCommittee = await ctx.prisma.committee.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedByEmail: ctx.session.user.email,
        },
      });

      revalidateTag("committee");

      return updatedCommittee;
    }),
  deleteCommitteeAsAuthed: organizationManagementProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(async ({ ctx, input: { id } }) => {
      const deletedCommittee = await ctx.prisma.committee.delete({
        where: {
          id,
        },
      });

      revalidateTag("committee");

      return deletedCommittee;
    }),
});
