import { type GetStaticProps, type NextPage } from "next";
import Link from "next/link";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import CommitteeImage from "~/components/organ/CommitteeImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: committees } = api.committee.getAll.useQuery();

  return (
    <>
      <HeadLayout title="Organ"></HeadLayout>
      <main>
        <SectionWrapper>
          <SectionTitle className="mb-8" center>
            Sektionsorgan
          </SectionTitle>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {committees?.map(({ name, slug, image, role }) => (
              <Link key={slug} href={`/student-division/committees/${slug}`}>
                <Card className="group shadow">
                  <CardContent className="flex flex-col items-center justify-center gap-2 pt-2">
                    <CommitteeImage alt={`${name}s logotyp`} filename={image} />
                    <CardTitle className="decoration-zBlack underline-offset-2 group-hover:underline">
                      {name}
                    </CardTitle>
                    <CardDescription>{role}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.committee.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
