import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { buttonVariants } from "~/components/ui/button";
import ssg from "~/server/api/helper/ssg";
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
              {documentGroups?.map(
                ({ Document: documents, extraText, name }, idx) => (
                  <AccordionItem key={name} value={name}>
                    <AccordionTrigger>{name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {documents.map(({ isPDF, title, url }) => (
                          <React.Fragment key={url}>
                            <div className="flex flex-row items-center justify-between px-2">
                              <p>{title}</p>
                              <div className="flex flex-row items-center justify-center gap-2">
                                {isPDF && (
                                  <>
                                    <a
                                      className={buttonVariants({
                                        variant: "link",
                                        size: "sm",
                                        className: "text-xs font-light",
                                      })}
                                      href={url}
                                      download
                                    >
                                      Ladda ner
                                    </a>
                                    <p> | </p>
                                  </>
                                )}
                                <Link
                                  className={buttonVariants({
                                    variant: "link",
                                    size: "sm",
                                    className: "text-xs font-light",
                                  })}
                                  href={
                                    isPDF
                                      ? `https://docs.google.com/viewer?url=${url}`
                                      : url
                                  }
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  Öppna
                                </Link>
                              </div>
                            </div>
                            {!(idx === documents.length && !extraText) && (
                              <div className="border-b border-black" />
                            )}
                          </React.Fragment>
                        ))}
                        {extraText && (
                          <div className="mt-2 flex flex-row items-center justify-between px-2 text-xs">
                            <p>{extraText}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
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
