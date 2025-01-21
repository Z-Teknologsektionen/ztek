import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { getAllCommittees } from "~/app/student-division/committees/_utils/get-all-committees";
import { ActiveCommitteeSection } from "./_components/active-committee-section";
import { OldCommitteSection } from "./_components/old-committe-section";
import { getCommitteeBySlug } from "./_utils/get-committee-by-slug";

type CommitteePageParams = {
  params: { slug: string };
};

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
  params: { slug },
}: CommitteePageParams): Promise<Metadata> => {
  const committee = await getCommitteeBySlug(slug);

  return {
    title: committee.name,
    description: committee.description,
  };
};

const CommitteePage: FC<CommitteePageParams> = async ({ params: { slug } }) => {
  const committee = await getCommitteeBySlug(slug).catch(() => notFound());

  return (
    <>
      <ActiveCommitteeSection {...committee} />
      {committee.showOldCommittee && (
        <OldCommitteSection
          key={committee.id}
          committeeId={committee.id}
          committeeName={committee.name}
        />
      )}
    </>
  );
};

export default CommitteePage;
