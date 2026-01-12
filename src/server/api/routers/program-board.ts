import { revalidateTag } from "next/cache";
import { z } from "zod";
import { deleteFileFromSftpServer } from "~/app/api/sftp/utils/sftp-engine";
import { objectId } from "~/schemas/helpers/custom-zod-helpers";
import {
  createProgramBoardMemberSchema,
  updateProgramBoardMemberSchema,
} from "~/schemas/program-board-member";
import {
  createTRPCRouter,
  programBoardProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const programBoardRouter = createTRPCRouter({
  getAllAsAuthed: programBoardProcedure.query(({ ctx }) => {
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
  getOneByRole: publicProcedure
    .input(z.object({ role: z.string().min(1) }))
    .query(({ ctx, input: { role } }) => {
      return ctx.prisma.programBoardMember.findFirstOrThrow({
        where: {
          role,
        },
      });
    }),
  createOneAsAuthed: programBoardProcedure
    .input(createProgramBoardMemberSchema)
    .mutation(
      async ({
        ctx,
        input: { name, role, phone, email, url, image, order },
      }) => {
        const newBoardMember = await ctx.prisma.programBoardMember.create({
          data: {
            name,
            role,
            phone,
            email,
            url,
            image,
            order,
            updatedByEmail: ctx.session.user.email,
            createdByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("boardProgramMembers");

        return newBoardMember;
      },
    ),
  updateOneAsAuthed: programBoardProcedure
    .input(updateProgramBoardMemberSchema)
    .mutation(
      async ({
        ctx,
        input: { id, name, role, phone, email, url, image, order },
      }) => {
        const updatedBoardMember = await ctx.prisma.programBoardMember.update({
          where: { id },
          data: {
            name,
            role,
            phone,
            email,
            url,
            image,
            order,
            updatedByEmail: ctx.session.user.email,
          },
        });

        revalidateTag("boardProgramMembers");

        return updatedBoardMember;
      },
    ),
  deleteOneAsAuthed: programBoardProcedure
    .input(
      z.object({
        id: objectId,
      }),
    )
    .mutation(async ({ ctx, input: { id } }) => {
      const deletedBoardMember = await ctx.prisma.programBoardMember.delete({
        where: { id },
      });

      // Delete image if it exists. It will always be an image on our ftp server.
      if (deletedBoardMember.image) {
        await deleteFileFromSftpServer({ url: deletedBoardMember.image });
      }

      revalidateTag("boardProgramMembers");

      return deletedBoardMember;
    }),
});
