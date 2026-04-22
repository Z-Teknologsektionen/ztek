import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { cached } from "~/utils/server-side-cache";
import { caller } from "~/utils/trpc-client/caller";
import { ActiveCommitteeSection } from "./_components/active-committee-section";
import { OldCommitteeSection } from "./_components/old-committee-section";

type CommitteePageParams = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async (): Promise<
  {
    params: {
      slug: string;
    };
  }[]
> => {
  const committees = await cached(caller.committee.getAll, ["committee"])();
  const slugs = committees.map((c) => {
    return { params: { slug: c.slug } };
  });
  return slugs;
};

export const generateMetadata = async ({
  params,
}: CommitteePageParams): Promise<Metadata> => {
  const { slug } = await params;
  const committee = await cached(caller.committee.getOneBySlug, ["committee"])({
    slug,
  });

  return {
    title: committee.name,
    description: committee.description,
  };
};

const CommitteePage: FC<CommitteePageParams> = async ({
  params,
}: CommitteePageParams) => {
  const { slug } = await params;
  const committee = await cached(caller.committee.getOneBySlug, ["committee"])({
    slug,
  }).catch(() => notFound());

  return (
    <>
      <ActiveCommitteeSection {...committee} />
      {committee.showOldCommittee && (
        <OldCommitteeSection
          key={committee.id}
          committeeId={committee.id}
          committeeName={committee.name}
        />
      )}
    </>
  );
};

export default CommitteePage;
