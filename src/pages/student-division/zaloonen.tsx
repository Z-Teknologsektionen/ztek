import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import DocumentsAccordionItem from "~/components/documents/documents-accordion-item";
import HeadLayout from "~/components/layout/head-layout";
import ImageWithCredit from "~/components/layout/image-with-credit";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";
import { Accordion } from "~/components/ui/accordion";
import { buttonVariants } from "~/components/ui/button";
import ssg from "~/server/api/helpers/ssg";
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
        <SectionTitle className="mb-4">Zaloonen</SectionTitle>
        <div className="grid grid-cols-5 gap-x-20">
          <div className="col-span-full lg:col-span-3">
            <p className="max-w-3xl">
              Zaloonen är Z-sektionens sektionslokal och är belägen på
              bottenplan i HB. Som Z-teknolog finns det möjlighet att hålla
              arrangemang i Zaloonen. Inför arrangemang i Zaloonen kommer ZÅG ta
              ut en städdeposition som återfås vid godkänd avsyning. Avsyning
              sker alltid kl 07:30 på vardagar och 11:30 på helger, om ni inte
              har någon annan överenskommelse med ZÅG.
              <br />
              <br />
              När man arrangerar i Zaloonen är det viktigt att tänka på att
              lokalen tillhör alla Z-teknologer mellan 08:00 och 17:00. Då det
              ofta är högt söktryck på Zaloonen har vi i stort sett ingen
              möjlighet att tillåta arrangemang som inte har med Z-sektionen att
              göra.
              <br />
              <br />
              Vi rekommenderar er som studerar på annan sektion att i första
              hand söka lokal inom egen sektion eller någon av Chalmers icke
              sektionsbundna lokaler och under tentaveckorna är vi väldigt
              restriktiva med arrangemang i Zaloonen då den behövs som
              studielokal.
              <br />
              <br />
            </p>
          </div>
          <div className="col-span-full mt-4 max-w-md lg:col-span-2">
            <ImageWithCredit
              alt="Bild på Zaloonen"
              height={1000}
              photoCommittee="zFoto"
              photographer="Dennis Holmström"
              src="/zaloonen.jpg"
              width={1000}
            />
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper className="py-4">
        {(isError || isLoading) && <SectionTitle>Dokument</SectionTitle>}
        {isError && (
          <p>
            Du kan hitta Zaloonens dokument{" "}
            <StyledLink href="/documents">här</StyledLink>
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
              className: "w-full bg-gray-200 uppercase sm:w-auto",
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
        className="mx-auto -mt-8 mb-8 aspect-video h-[100vh] w-full max-w-3xl overscroll-auto"
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
