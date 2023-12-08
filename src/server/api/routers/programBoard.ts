import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const programBoardRouter = createTRPCRouter({
  getAllAsAdmin: adminProcedure.query(({ ctx }) => {
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
  createOne: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        role: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().email().min(1),
        url: z.string().url().min(1),
        image: z.string().min(1),
        order: z.number().min(1),
      }),
    )
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
  updateOne: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        role: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().email().min(1),
        url: z.string().url().min(1),
        image: z.string().min(1),
        order: z.number(),
      }),
    )
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
  deleteOne: adminProcedure
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
