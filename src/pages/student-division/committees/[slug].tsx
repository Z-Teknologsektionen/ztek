import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
  type NextPage,
} from "next";
import { useRouter } from "next/router";
import CommitteeMemberCard from "~/components/committees/committee-member-card";
import CommitteeSocialIcon from "~/components/committees/committee-social-icon";
import OldCommitteSection from "~/components/committees/old-committees/old-committe-section";
import HeadLayout from "~/components/layout/head-layout";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { TooltipProvider } from "~/components/ui/tooltip";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";
import { openUrlAsPdf } from "~/utils/open-url-as-pdf";

const CommitteePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ slug }) => {
  const router = useRouter();
  const { data: committee } = api.committee.getOneBySlug.useQuery({
    slug,
  });

  if (committee === undefined) return router.push("/404");

  return (
    <>
      <HeadLayout title={committee.name}>
        <link href={committee.image} rel="icon" type="image/x-icon" />
      </HeadLayout>
      <main>
        <SectionWrapper>
          <div className="mx-auto max-w-3xl space-y-2 border-b-2 border-t-2 p-4 text-center">
            <SectionTitle>{committee.name}</SectionTitle>
            <p>{committee.description}</p>
            <TooltipProvider>
              <div className="flex flex-row flex-wrap justify-center gap-2">
                {committee.socialLinks.length !== 0 ? (
                  committee.socialLinks.map((socialLink) => (
                    <CommitteeSocialIcon {...socialLink} key={socialLink.url} />
                  ))
                ) : (
                  <CommitteeSocialIcon
                    iconVariant="MAIL"
                    url={committee.email}
                  />
                )}
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
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
            {committee.members.length !== 0 &&
              committee.members.map((member) => (
                <CommitteeMemberCard key={member.id} {...member} />
              ))}
          </div>
        </SectionWrapper>
        <OldCommitteSection
          key={committee.id}
          committeeId={committee.id}
          committeeName={committee.name}
        />
      </main>
    </>
  );
};

export default CommitteePage;

export const getStaticProps: GetStaticProps<
  { slug: string },
  { slug: string }
> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    await ssg.committee.getOneBySlug.fetch({ slug });
    return {
      props: {
        trpcState: ssg.dehydrate(),
        slug,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const committees = await ssg.committee.getAll.fetch();
  const slugs = committees.map((c) => {
    return { params: { slug: c.slug } };
  });
  return {
    paths: slugs,
    fallback: "blocking",
  };
};
