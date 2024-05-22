import { prisma } from "~/server/db";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCommitteeMemberByEmail = (email: string) =>
  prisma.committeeMember.findFirst({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      phone: true,
      image: true,
      committee: true,
      nickName: true,
    },
  });
