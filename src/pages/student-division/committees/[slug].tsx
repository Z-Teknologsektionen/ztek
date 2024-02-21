import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
  type NextPage,
} from "next";
import { useRouter } from "next/router";
import CommitteeMemberCard from "~/components/committees/committee-member-card";
import CommitteeSocialIcon from "~/components/committees/committee-social-icon";
import HeadLayout from "~/components/layout/head-layout";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import OldCommitteeCard from "~/components/old-committees/old-committee-card";
import { TooltipProvider } from "~/components/ui/tooltip";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const CommitteePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ slug }) => {
  const router = useRouter();
  const { data: committee } = api.committee.getOneBySlug.useQuery({
    slug,
  });

  const { data: oldCommittees } =
    api.oldCommittee.getManyByCommitteeId.useQuery({
      belongsToCommitteeId: committee?.id || "",
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
            {committee.socialLinks.length !== 0 ? (
              <TooltipProvider>
                <div className="flex flex-row flex-wrap justify-center gap-2">
                  {committee.socialLinks.map((socialLink) => (
                    <CommitteeSocialIcon {...socialLink} key={socialLink.url} />
                  ))}
                </div>
              </TooltipProvider>
            ) : (
              <p className="text-sm">
                - Kontakt:{" "}
                <a
                  className="underline decoration-zDarkGray/50 underline-offset-2 hover:opacity-75"
                  href={`mailto:${committee.email}`}
                >
                  {committee.email}
                </a>
              </p>
            )}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
            {committee.members.length !== 0 ? (
              committee.members.map((member) => (
                <CommitteeMemberCard key={member.id} {...member} />
              ))
            ) : (
              <div>
                <SecondaryTitle center>Information saknas</SecondaryTitle>
                <p className="block text-center">
                  Sittande har inte lagt in någon information. Är detta ditt
                  organ kan du logga in och lägga till information.
                </p>
              </div>
            )}
          </div>
        </SectionWrapper>
        {oldCommittees && (
          <SectionWrapper>
            {oldCommittees.length !== 0 && (
              <div>
                <div className="mx-auto max-w-3xl space-y-2 border-b-2 border-t-2 p-4 text-center">
                  <SectionTitle center>Patethimmel</SectionTitle>
                  <p>
                    Här hittar du alla medlemmar som varit med i{" "}
                    {committee.name} genom åren. Tryck på de olika åren för att
                    få mer information.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-1 place-items-center gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {oldCommittees.map((oldCommittee) => (
                    <div key={oldCommittee.id}>
                      <OldCommitteeCard {...oldCommittee} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SectionWrapper>
        )}
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
