import { NextResponse } from "next/server";
import { prisma } from "~/server/db";

export const dynamic = "force-dynamic";

export const GET = async (): Promise<NextResponse> => {
  /* const all = await prisma.programBoardMember.findMany({
    select: {
      id: true,
    },
  });
  const allformat = await Promise.all(
    all.map(async (item) => {
      return await prisma.programBoardMember.update({
        where: {
          id: item.id,
        },
        data: {
          createdAt: new ObjectId(item.id).getTimestamp(),
          updatedByEmail: null,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          updatedAt: true,
          updatedByEmail: true,
          createdAt: true,
        },
      });
    }),
  ); */

  const allformat = await prisma.user.update({
    where: {
      id: "65a1678fa2e9c18ff77e1db3",
    },
    data: {
      email: "regizzor.zfoto@ztek.se",
    },
  });

  return NextResponse.json({ allformat });
};
