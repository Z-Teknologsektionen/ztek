import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
  type NextPage,
} from "next";
import Link from "next/link";
import { type FC } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import CommitteeImage from "~/components/organ/CommitteeImage";
import ssg from "~/server/api/helper/ssg";
import { type RouterOutputs } from "~/utils/api";
import { TempFooter, TempHeader } from "..";

const CommitteePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ committee }) => {
  return (
    <>
      <HeadLayout title={committee.name}>
        <link href={committee.image} rel="icon" type="image/x-icon" />
      </HeadLayout>
      <TempHeader />
      <main>
        <SectionWrapper>
          <div className="mx-auto max-w-3xl space-y-2 border-b-2 border-t-2 p-4 text-center">
            <SectionTitle>{committee.name}</SectionTitle>
            <p>{committee.description}</p>
            <p>
              - Kontakt:{" "}
              <a
                className="hover:opacity-75"
                href={`mailto:${committee.email}`}
              >
                {committee.email}
              </a>
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {committee.members.length !== 0 ? (
              committee.members.map((member) => (
                <CommitteeMemberCard key={member.role} {...member} />
              ))
            ) : (
              <div>
                <SectionTitle center>Saknar Information</SectionTitle>
                <p className="block text-center">
                  Sittande har inte lagt in någon information. Se länk nedan för
                  att kunna redigera
                </p>
              </div>
            )}
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle center>Saknar du något?</SectionTitle>
          <p className="text-center">
            Om du är sittande kan du redigera innehållet genom att{" "}
            <Link className="underline underline-offset-2" href={"/organ/edit"}>
              logga in
            </Link>
          </p>
        </SectionWrapper>
      </main>
      <TempFooter />
    </>
  );
};

export default CommitteePage;

export const getStaticProps: GetStaticProps<
  { committee: RouterOutputs["committee"]["getOneBySlug"] },
  { slug: string }
> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const committee = await ssg.committee.getOneBySlug.fetch({ slug });
    return {
      props: {
        committee,
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

const CommitteeMemberCard: FC<
  RouterOutputs["committee"]["getOneBySlug"]["members"][0]
> = ({ email, image, name, nickName, phone, role }) => (
  <div className="flex justify-center rounded-lg px-2 py-4 shadow">
    <div className="space-y-4">
      <CommitteeImage
        alt={`Profilbild på ${nickName ? `"${nickName}"` : name || ""}`}
        filename={image}
      />
      <div className="space-y-1.5">
        <h2 className="text-lg font-medium leading-none">{nickName || name}</h2>
        <h3 className="text-sm font-normal leading-none">
          {nickName && name ? name : " "}
        </h3>
        <p className="text-sm font-light leading-tight">{role}</p>
        {email && (
          <a
            className="block text-xs font-extralight leading-tight underline decoration-black underline-offset-2"
            href={`mailto:${email}`}
          >
            <AiOutlineMail className="mr-2 inline-block" size={16} />
            {email}
          </a>
        )}
        {phone && (
          <a
            className="block text-xs font-extralight leading-tight underline decoration-black underline-offset-2"
            href={`tel:${phone}`}
          >
            <AiOutlinePhone className="mr-2 inline-block" size={16} />
            {phone}
          </a>
        )}
      </div>
    </div>
  </div>
);
