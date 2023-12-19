import type { GetStaticProps, NextPage } from "next";
import DocumentsAccordionItem from "~/components/documents/DocumentsAccordionItem";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
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
