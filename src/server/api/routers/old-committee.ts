import { AccountRoles } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  objectId,
  standardBoolean,
} from "~/schemas/helpers/custom-zod-helpers";
import {
  createOldCommitteeFromCommitteeSchema,
  createOldCommitteeSchema,
  updateOldCommitteeSchema,
} from "~/schemas/old-committee";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const oldCommitteeRouter = createTRPCRouter({
  getManyByCommitteeId: publicProcedure
    .input(
      z.object({
        belongsToCommitteeId: objectId,
      }),
    )
    .query(({ ctx, input: { belongsToCommitteeId } }) => {
      return ctx.prisma.oldCommittee.findMany({
        where: {
          belongsToCommitteeId: belongsToCommitteeId,
        },
        select: {
          id: true,
          name: true,
          year: true,
          image: true,
          logo: true,
          members: {
            select: {
              name: true,
              nickName: true,
              order: true,
              role: true,
            },
          },
        },
        orderBy: [{ year: "desc" }],
      });
    }),
  getManyByCommitteeIdAsActive: protectedProcedure
    .input(
      z.object({
        belongsToCommitteeId: objectId,
        isAdmin: standardBoolean,
      }),
    )
    .query(({ ctx, input: { belongsToCommitteeId, isAdmin } }) => {
      return ctx.prisma.oldCommittee.findMany({
        where: {
          belongsToCommitteeId: isAdmin ? undefined : belongsToCommitteeId,
        },
        select: {
          id: true,
          name: true,
          year: true,
          image: true,
          logo: true,
          members: {
            select: {
              name: true,
              nickName: true,
              order: true,
              role: true,
            },
          },
          updatedAt: true,
          belongsToCommitteeId: true,
          belongsToCommittee: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [{ year: "desc" }, { updatedAt: "desc" }],
      });
    }),
  createOldCommitteeAsActive: protectedProcedure
    .input(createOldCommitteeSchema)
    .mutation(
      ({
        ctx,
        input: { name, year, image, logo, members, belongsToCommitteeId },
      }) => {
        return ctx.prisma.oldCommittee.create({
          data: {
            belongsToCommitteeId,
            name,
            year,
            image,
            logo,
            members,
          },
        });
      },
    ),
  createOldCommitteeFromCommitteeAsActive: protectedProcedure
    .input(createOldCommitteeFromCommitteeSchema)
    .mutation(
      async ({ ctx: { prisma, session }, input: { belongsToCommitteeId } }) => {
        if (
          belongsToCommitteeId !== session.user.committeeId &&
          !session.user.roles.includes(AccountRoles.ADMIN)
        )
          throw new TRPCError({
            code: "FORBIDDEN",
            message:
              "Du får inte skapa ett patet organ för något annat än ditt eget organ",
          });

        const activeCommittee = await prisma.committee
          .findUniqueOrThrow({
            where: {
              id: belongsToCommitteeId,
            },
            include: {
              members: {
                orderBy: [{ order: "desc" }],
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
              },
            },
          })
          .catch(() => {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Kunde inte hitta organet du ville uppdatera",
            });
          });

        let year = activeCommittee.updatedAt.getFullYear();
        if (
          new Date(new Date().getFullYear(), 0, 1) < activeCommittee.updatedAt
        ) {
          year -= 1;
        }
        let formatedYear = `${year.toString().slice(2)}/${(year + 1)
          .toString()
          .slice(2)}`;
        if (activeCommittee.electionPeriod === 2) {
          formatedYear = year.toString().slice(2);
        }

        const data = await createOldCommitteeSchema
          .parseAsync({
            name: `${activeCommittee.name} ${formatedYear}`,
            year: year,
            belongsToCommitteeId: activeCommittee.id,
            members: activeCommittee.members.map(
              ({ name, nickName, order, role }) => {
                return {
                  name,
                  nickName,
                  order,
                  role,
                };
              },
            ),
            logo: activeCommittee.image,
            image: "",
          })
          .catch(() => {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `Ogiltig data. Kunde inte skapa patetorganet. Vänligen skapa det manuellt\n }`,
            });
          });

        return prisma.oldCommittee.create({
          data,
        });
      },
    ),
  updateOneAsActive: protectedProcedure
    .input(updateOldCommitteeSchema)
    .mutation(
      ({
        ctx,
        input: { id, name, year, image, logo, belongsToCommitteeId, members },
      }) => {
        return ctx.prisma.oldCommittee.update({
          where: {
            id,
          },
          data: {
            name,
            year,
            image,
            logo,
            belongsToCommitteeId,
            members: members
              ? {
                  set: members.map((member) => ({
                    name: member.name,
                    nickName: member.nickName,
                    role: member.role,
                    order: member.order,
                  })),
                }
              : undefined,
          },
        });
      },
    ),
  deleteOneAsActive: protectedProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.oldCommittee.delete({
        where: {
          id,
        },
      });
    }),
});
