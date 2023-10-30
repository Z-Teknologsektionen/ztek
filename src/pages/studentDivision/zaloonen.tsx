import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import DocumentsAccordionItem from "~/components/documents/DocumentsAccordionItem";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Accordion } from "~/components/ui/accordion";
import { buttonVariants } from "~/components/ui/button";
import ssg from "~/server/api/helper/ssg";
import { api } from "~/utils/api";

const DOCUMENTGROUP_KEY = "Dokument för Zaloonen";

const ZaloonenPage: NextPage = () => {
  const { data, isLoading, isError } = api.document.getOneGroupByName.useQuery({
    name: DOCUMENTGROUP_KEY,
  });

  return (
    <>
      <HeadLayout title="Zaloonen" />
      <SectionWrapper>
        <SectionTitle className="w-full">Om Zaloonen</SectionTitle>
        <p className="max-w-3xl">
          Zaloonen är Z-sektionens sektionslokal och är belägen på bottenplan i
          HB. Som Z-teknolog finns det möjlighet att hålla arrangemang i
          Zaloonen. <br />
          <br />
          Inför arrangemang i Zaloonen kommer ZÅG ta ut en städdeposition som
          återfås vid godkänd avsyning. <br />
          <br />
          När man arrangerar i Zaloonen är det viktigt att tänka på att lokalen
          tillhör alla Z-teknologer mellan 08:00 och 17:00. <br />
          <br />
          Under tentaveckorna är vi väldigt restriktiva med arrangemang i
          Zaloonen då den behövs som studielokal. <br />
          <br />
          Då det ofta är högt söktryck på Zaloonen har vi i stort sett ingen
          möjlighet att tillåta arrangemang som inte har med Z-sektionen att
          göra. Vi rekomenderar er som studerar på annan sektion att i första
          hand söka lokal inom egen sektion eller någon av chalmers icke
          sektionsbunda lokaler.
        </p>
      </SectionWrapper>
      <SectionWrapper>
        {(isError || isLoading) && <SectionTitle>Dokument</SectionTitle>}
        {isError && (
          <p>
            Du kan hitta Zaloonens dokument{" "}
            <Link
              className={buttonVariants({
                variant: "link",
                size: "default",
                className: "px-0 font-normal",
              })}
              href={"/documents"}
            >
              här
            </Link>
          </p>
        )}
        {isLoading && <p>Försöker hämta Zaloonens dokument...</p>}
        {data && (
          <Accordion type="single" collapsible>
            <DocumentsAccordionItem
              {...{ documents: data.Document, ...data }}
            />
          </Accordion>
        )}
      </SectionWrapper>
      <SectionWrapper>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <SectionTitle>Bokningar</SectionTitle>
            <p className="mt-1 text-sm font-light">
              Här är Zaloonens bokningskalender. Observera att formuläret bara
              är en intresseanmälan.
            </p>
          </div>
          <Link
            className={buttonVariants({
              className: "w-full uppercase sm:w-auto",
              size: "lg",
              variant: "outline",
            })}
            href="https://docs.google.com/forms/d/e/1FAIpQLSehZ_u-t8Gu067sr_DmY5edTgdmTQSORCEqYI5EdRLLpJ3NJw/viewform"
            rel="noopener noreferrer"
            target="_blank"
          >
            Boka Zaloonen!
          </Link>
        </div>
      </SectionWrapper>
      <iframe
        className="mx-auto -mt-8 mb-8 aspect-video h-[75vh] w-full max-w-3xl"
        seamless={true}
        src="https://embed.styledcalendar.com/#KwrikxxDh0q9078hGAzF"
        style={{ overflow: "hidden" }}
        title="zaloonenCal"
      />
    </>
  );
};

export default ZaloonenPage;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.document.getOneGroupByName.prefetch({ name: DOCUMENTGROUP_KEY });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
