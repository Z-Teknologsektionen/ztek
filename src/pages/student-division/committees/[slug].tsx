import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
  type NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import CommitteeMemberCard from "~/components/committees/CommitteeMemberCard";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const CommitteePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ slug }) => {
  const router = useRouter();
  const { data: committee } = api.committee.getOneBySlug.useQuery({
    slug,
  });

  if (committee === undefined) return router.push("/404");

  const hasLinkAndLinkText = committee.link !== "" && committee.linkText !== "";
  const isExternalLink = committee.link.startsWith("http");

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
            {hasLinkAndLinkText && (
              <p className="text-sm">
                - Se mer från {committee.name}:{" "}
                <Link
                  className="underline decoration-zDarkGray/50 underline-offset-2 hover:opacity-75"
                  href={committee.link}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                  target={isExternalLink ? "_blank" : "_self"}
                >
                  {committee.linkText}
                </Link>
              </p>
            )}
            <p className="text-sm">
              - Kontakt:{" "}
              <a
                className="underline decoration-zDarkGray/50 underline-offset-2 hover:opacity-75"
                href={`mailto:${committee.email}`}
              >
                {committee.email}
              </a>
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
            {committee.members.length !== 0 ? (
              committee.members.map((member) => (
                <CommitteeMemberCard key={member.role} {...member} />
              ))
            ) : (
              <div>
                <SecondaryTitle center>Saknar information</SecondaryTitle>
                <p className="block text-center">
                  Sittande har inte lagt in någon information. Se länk nedan för
                  att kunna redigera
                </p>
              </div>
            )}
          </div>
        </SectionWrapper>
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
