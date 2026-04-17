import { AccountRoles } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { deleteFileFromSftpServer } from "~/app/api/sftp/utils/sftp-engine";
import { objectId } from "~/schemas/helpers/common-zod-helpers";
import {
  createProgramBoardMemberSchema,
  updateProgramBoardMemberSchema,
} from "~/schemas/program-board-member";
import { trpc } from "~/server/trpc/init";
import {
  enforceRoleOrAdmin,
  protectedProcedure,
  publicProcedure,
} from "~/server/trpc/procedure-builders";

const programBoardProcedure = protectedProcedure.use(
  enforceRoleOrAdmin(AccountRoles.MODIFY_PROGRAM_BOARD),
);

export const programBoardRouter = trpc.router({
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

        revalidateTag("boardProgramMembers", "max");

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

        revalidateTag("boardProgramMembers", "max");

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

      revalidateTag("boardProgramMembers", "max");

      return deletedBoardMember;
    }),
});
