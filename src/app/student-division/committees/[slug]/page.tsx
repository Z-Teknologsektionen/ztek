import type { Metadata } from "next";
import { cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { cacheableCaller } from "~/utils/trpc-client/caller";
import { ActiveCommitteeSection } from "./_components/active-committee-section";
import { OldCommitteeSection } from "./_components/old-committee-section";

type CommitteePageParams = {
  params: Promise<{ slug: string }>;
};

// cached tRPC helpers
const getCommitteeBySlug = async (slug: string) => {
  "use cache";
  cacheTag("committee");
  return await cacheableCaller.committee.getOneBySlug({ slug });
};
const getAllCommittees = async () => {
  "use cache";
  cacheTag("committee");
  return await cacheableCaller.committee.getAll();
};

// page metadata etc etc
export const generateStaticParams = async (): Promise<
  {
    params: {
      slug: string;
    };
  }[]
> => {
  const committees = await getAllCommittees();
  const slugs = committees.map((c) => {
    return { params: { slug: c.slug } };
  });
  return slugs;
};
export const generateMetadata = async ({
  params,
}: CommitteePageParams): Promise<Metadata> => {
  const { slug } = await params;
  const committee = await getCommitteeBySlug(slug).catch(() => notFound());

  return {
    title: committee.name,
    description: committee.description,
  };
};

// FC
const CommitteePage: FC<CommitteePageParams> = async ({
  params,
}: CommitteePageParams) => {
  const { slug } = await params;
  const committee = await getCommitteeBySlug(slug).catch(() => notFound());

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
