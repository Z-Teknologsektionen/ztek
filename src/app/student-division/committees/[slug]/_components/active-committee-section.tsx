import type { IconEnum } from "@prisma/client";
import type { FC } from "react";
import { CommitteeMemberCard } from "~/app/student-division/committees/_components/committee-member-card";
import { CommitteeSocialIcon } from "~/components/committees/committee-social-icon";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { openUrlAsPdf } from "~/utils/open-url-as-pdf";

type ActiveCommitteeSectionProps = {
  description: string;
  document: {
    isPDF: boolean;
    url: string;
  } | null;
  electionPeriods: number[];
  email: string;
  id: string;
  image: string;
  members: {
    email: string;
    id: string;
    image: string;
    name: string;
    nickName: string;
    phone: string;
    role: string;
  }[];
  name: string;
  socialLinks: {
    iconVariant: IconEnum;
    linkText: string | null;
    url: string;
  }[];
};

export const ActiveCommitteeSection: FC<ActiveCommitteeSectionProps> = (
  committee,
) => {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-3xl space-y-2 border-b-2 border-t-2 p-4 text-center">
        <SectionTitle>{committee.name}</SectionTitle>
        <p>{committee.description}</p>
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <CommitteeSocialIcon iconVariant="MAIL" url={committee.email} />
          {committee.socialLinks.map((socialLink) => (
            <CommitteeSocialIcon {...socialLink} key={socialLink.url} />
          ))}
          {committee.document && (
            <CommitteeSocialIcon
              iconVariant="DOCUEMNT"
              url={openUrlAsPdf({
                url: committee.document.url,
                isPDF: committee.document.isPDF,
              })}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
        {committee.members.length !== 0 &&
          committee.members.map((member) => (
            <CommitteeMemberCard key={member.id} {...member} />
          ))}
      </div>
    </SectionWrapper>
  );
};
