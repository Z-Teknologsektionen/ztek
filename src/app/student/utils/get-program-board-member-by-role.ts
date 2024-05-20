import { prisma } from "~/server/db";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProgramBoardMemberByRole = (role: string) =>
  prisma.programBoardMember.findFirst({
    where: {
      role,
    },
    select: {
      name: true,
      email: true,
      image: true,
      phone: true,
      role: true,
      url: true,
    },
  });
