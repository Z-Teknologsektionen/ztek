import { z } from "zod";
import {
  createProgramBoardMemberSchema,
  updateProgramBoardMemberSchema,
} from "~/server/api/helpers/schemas/programBoardMembers";
import {
  createTRPCRouter,
  programBoardProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const programBoardRouter = createTRPCRouter({
  getAllAsAdmin: programBoardProcedure.query(({ ctx }) => {
    return ctx.prisma.programBoardMember.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        phone: true,
        email: true,
        url: true,
        image: true,
        order: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.programBoardMember.findMany({
      select: {
        name: true,
        role: true,
        phone: true,
        email: true,
        url: true,
        image: true,
        order: true,
      },
    });
  }),
  getOneByRole: publicProcedure
    .input(z.object({ role: z.string().min(1) }))
    .query(({ ctx, input: { role } }) => {
      return ctx.prisma.programBoardMember.findFirstOrThrow({
        where: {
          role,
        },
      });
    }),
  createOne: programBoardProcedure
    .input(createProgramBoardMemberSchema)
    .mutation(
      ({ ctx, input: { name, role, phone, email, url, image, order } }) => {
        return ctx.prisma.programBoardMember.create({
          data: {
            name,
            role,
            phone,
            email,
            url,
            image,
            order,
          },
        });
      },
    ),
  updateOne: programBoardProcedure
    .input(updateProgramBoardMemberSchema)
    .mutation(
      ({ ctx, input: { id, name, role, phone, email, url, image, order } }) => {
        return ctx.prisma.programBoardMember.update({
          where: { id },
          data: {
            name,
            role,
            phone,
            email,
            url,
            image,
            order,
          },
        });
      },
    ),
  deleteOne: programBoardProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input: { id } }) => {
      return ctx.prisma.programBoardMember.delete({
        where: { id },
      });
    }),
});
