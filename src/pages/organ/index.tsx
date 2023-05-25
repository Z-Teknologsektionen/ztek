import { type GetStaticProps, type NextPage } from "next";
import Link from "next/link";
import Footer from "~/components/layout/Footer";
import HeadLayout from "~/components/layout/HeadLayout";
import Header from "~/components/layout/Header";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import CommitteeImage from "~/components/organ/CommitteeImage";
import ssg from "~/server/api/helper/ssg";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: committees } = api.committee.getAll.useQuery();

  return (
    <>
      <HeadLayout title="Organ"></HeadLayout>

      <Header />
      <main>
        <SectionWrapper className="">
          <SectionTitle className="mb-8" center>
            Sektionsorgan
          </SectionTitle>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {committees &&
              committees.map(({ name, slug, image, role }) => (
                <Link
                  key={slug}
                  className="flex flex-col items-center justify-center gap-4 rounded px-2 py-4 text-center shadow"
                  href={`/organ/${slug}`}
                >
                  <CommitteeImage alt={`${name}s logotyp`} filename={image} />
                  <div className="space-y-1">
                    <h2 className="text-center text-xl font-semibold underline decoration-black/75 underline-offset-4">
                      {name}
                    </h2>
                    <p className="font-light">{role}</p>
                  </div>
                </Link>
              ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
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
