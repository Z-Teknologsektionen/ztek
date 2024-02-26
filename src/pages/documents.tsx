import type { GetStaticProps, NextPage } from "next";
import DocumentsAccordionItem from "~/components/documents/documents-accordion-item";
import HeadLayout from "~/components/layout/head-layout";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import { Accordion } from "~/components/ui/accordion";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const DocumentsPage: NextPage = () => {
  const { data: documentGroups } = api.document.getAllSortedByGroup.useQuery();

  return (
    <>
      <HeadLayout title="Dokument"></HeadLayout>
      <main className="">
        <SectionWrapper>
          <SectionTitle className="" center>
            Dokument
          </SectionTitle>
          <div className="flex flex-col gap-8">
            <Accordion type="single" collapsible>
              {documentGroups?.map(({ Document: documents, ...rest }) => (
                <DocumentsAccordionItem
                  key={rest.name}
                  documents={documents}
                  {...rest}
                />
              ))}
            </Accordion>
          </div>
        </SectionWrapper>
      </main>
    </>
  );
};

export default DocumentsPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    await ssg.document.getAllSortedByGroup.prefetch();
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
