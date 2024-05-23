import Image from "next/image";
import type { FC } from "react";
import { getProgramBoardMemberByRole } from "~/app/student/utils/get-program-board-member-by-role";
import StyledLink from "~/components/layout/styled-link";
import { Skeleton } from "~/components/ui/skeleton";

const PROGRAMANSVARIG_KEY = "Programansvarig";

export const ProgramManagerImage: FC = async () => {
  const programManager = await getProgramBoardMemberByRole(PROGRAMANSVARIG_KEY);

  if (!programManager) {
    return (
      <div className="mt-2 text-center">
        <p>Kunde inte hämta programansvarig... </p>
      </div>
    );
  }

  return (
    <>
      <Image
        alt="image"
        className="rounded"
        height={400}
        src={programManager?.image ? programManager.image : "/logo.png"}
        width={400}
      />
      <div className="mt-2 text-center">
        <p>
          <strong>{programManager.name}</strong> - programansvarig
        </p>
        <StyledLink href={`mailto:${programManager.email}`}>
          {programManager.email}
        </StyledLink>
      </div>
    </>
  );
};

export const ProgramManagerImageSkeleton: FC = () => (
  <>
    <Skeleton className="h-96 w-96 rounded-full" />
    <div className="mt-2 text-center">
      <Skeleton className="h-4" />
      <Skeleton className="mt-1 h-4" />
    </div>
  </>
);
