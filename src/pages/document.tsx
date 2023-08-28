import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";
import Footer from "~/components/layout/Footer";
import HeadLayout from "~/components/layout/HeadLayout";
import Header from "~/components/layout/Header";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import ssg from "~/server/api/helper/ssg";
import { api } from "~/utils/api";

const DocumentsPage: NextPage = () => {
  const { data: documentGroups } = api.document.getAllSortedByGroup.useQuery();

  return (
    <>
      <HeadLayout title="Dokument"></HeadLayout>
      <Header />
      <main className="">
        <SectionWrapper>
          <SectionTitle center>Dokument</SectionTitle>
          <div className="space-y-4">
            {documentGroups?.map(({ Document: documents, extraText, name }) => (
              <details
                key={name}
                className="group overflow-hidden rounded border-2 border-zLightGray"
              >
                <summary className="flex w-full flex-row justify-between bg-zLightGray p-1.5">
                  <h2 className="text-lg font-medium">{name}</h2>
                  <MdArrowDropDown
                    className="transition-transform group-open:rotate-180"
                    size={32}
                  />
                </summary>
                <div className={`space-y-4 p-6`}>
                  <ul className="flex flex-col gap-4">
                    {documents.map(({ isPDF, title, url }, idx) => (
                      <>
                        <li key={url}>
                          <div className="flex flex-row justify-between px-2">
                            <p>{title}</p>
                            <div className="flex flex-row items-center justify-center gap-2">
                              {isPDF && (
                                <>
                                  <a
                                    className="text-xs font-normal hover:opacity-75"
                                    href={url}
                                    download
                                  >
                                    Ladda ner
                                  </a>
                                  <p>|</p>
                                </>
                              )}
                              <Link
                                className="text-xs font-normal hover:opacity-75"
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
                        </li>
                        {idx !== documents.length - 1 && (
                          <hr className="border-zLightGray" />
                        )}
                      </>
                    ))}
                  </ul>
                  {extraText && (
                    <>
                      <hr className="border-zLightGray" />
                      <p className="text-sm font-light">{extraText}</p>
                    </>
                  )}
                </div>
              </details>
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
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
