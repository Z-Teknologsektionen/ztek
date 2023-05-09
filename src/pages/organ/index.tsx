import { type GetStaticProps, type NextPage } from "next";
import Link from "next/link";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import CommitteeImage from "~/components/organ/CommitteeImage";
import ssg from "~/server/api/helper/ssg";
import { api, type RouterOutputs } from "~/utils/api";
import { TempHeader } from "..";

const Home: NextPage = () => {
  const { data: committees } = api.committee.getAll.useQuery();

  return (
    <>
      <HeadLayout title="Organ"></HeadLayout>

      <TempHeader />
      <main>
        <section className="mx-auto my-16 max-w-7xl px-4 md:px-6 xl:px-0">
          <SectionTitle className="mb-8" center>
            Sektionsorgan
          </SectionTitle>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {committees &&
              committees.map(({ name, slug, image, role }) => (
                <>
                  <Link
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
                </>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{
  committees: RouterOutputs["committee"]["getAll"];
}> = async () => {
  const committees = await ssg.committee.getAll.fetch();
  return {
    props: {
      committees,
    },
    revalidate: 1,
  };
};
