import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { MdEmail, MdInfo } from "react-icons/md";
import SecondaryTitle from "~/components/layout/secondary-title";
import { Skeleton } from "~/components/ui/skeleton";
import { prisma } from "~/server/db";

export const ProgramBoardCards: FC = async () => {
  const programBoardMembers = await prisma.programBoardMember.findMany({
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {programBoardMembers.map((person) => (
        <div key={person.role} className="mx-auto mt-2 block text-center">
          <SecondaryTitle className="mb-4">{person.role}</SecondaryTitle>
          <Image
            alt={person.name}
            className="mx-auto rounded-full"
            height={200}
            src={person.image ? person.image : "/logo.png"}
            width={200}
          />
          <p className="text-lg font-semibold">{person.name}</p>
          <ul className="ml-3 mt-2">
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdEmail />
              <Link
                className="ml-1 hover:underline"
                href={`mailto:${person.email}`}
                target="_blank"
              >
                {person.email}
              </Link>
            </li>
            <li className="mb-2 flex items-center justify-center md:justify-start">
              <MdInfo />
              <Link
                className="ml-1 hover:underline"
                href={person.url}
                target="_blank"
              >
                Mer information
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export const ProgramBoardCardsSkeleton: FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    {Array.from({ length: 3 }).map((_, idx) => (
      <div key={idx} className="mx-auto mt-2 block text-center">
        <Skeleton className="mb-4 h-7 w-full" />
        <Skeleton className="aspect-square h-[200px] rounded-full" />
        <Skeleton className="h-5 w-full" />
        <ul className="ml-3 mt-2">
          <li className="mb-2 flex items-center justify-center md:justify-start">
            <MdEmail />
            <Skeleton className="ml-1 h-6 w-full" />
          </li>
          <li className="mb-2 flex items-center justify-center md:justify-start">
            <MdEmail />
            <Skeleton className="ml-1 h-6 w-full" />
          </li>
        </ul>
      </div>
    ))}
  </div>
);
