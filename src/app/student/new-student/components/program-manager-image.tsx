import { cacheTag } from "next/cache";
import Image from "next/image";
import type { FC } from "react";
import StyledLink from "~/components/layout/styled-link";
import { Skeleton } from "~/components/ui/skeleton";
import { cacheableCaller } from "~/utils/trpc-client/caller";

const PROGRAMANSVARIG_KEY = "Programansvarig";

export const ProgramManagerImage: FC = async () => {
  const programManager = await (async () => {
    "use cache";
    cacheTag("boardProgramMembers");
    return await cacheableCaller.programBoard.getOneByRole({
      role: PROGRAMANSVARIG_KEY,
    });
  })();

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
        unoptimized
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
