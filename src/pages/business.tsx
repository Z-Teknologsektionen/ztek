import type { NextPage } from "next";
import Image from "next/image";
import { MdCheckCircle } from "react-icons/md";
import ExternalLink from "~/components/layout/external-link";
import HeadLayout from "~/components/layout/head-layout";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
const BusinessPage: NextPage = () => {
  return (
    <>
      <HeadLayout title="För företag" />
      <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
        <SectionWrapper>
          <SectionTitle>Välkommen till ArgZ</SectionTitle>
          <p>
            ArgZ är Automation och Mekatroniks arbetsmarknadsgrupp. För de
            flesta är studierna på Chalmers den sista anhalten innan steget ut i
            arbetslivet tas på allvar. Det är därför viktigt att studenterna ges
            möjligheten att bilda sig en uppfattning om det som komma skall. För
            att kunna erbjuda ett smakprov av framtiden arbetar ArgZ med att
            skapa tillfällen där företag och studenter får möjlighet att skapa
            kontakt med varandra. Det kan exempelvis vara i form av
            företagspresentationer, studiebesök eller case-kvällar. Dessutom
            anordnar vi varje år arbetsmarknadsdagen ZMART. ArgZ förmedlar den
            unika kompetens som studenter på Automation och Mekatronik besitter
            till potentiella arbetsgivare, samtidigt får företag chansen att
            marknadsföra sig och skapa en långsiktig rekryteringsbas. Kontakta
            oss på{" "}
            <ExternalLink href="mailto:foretag@argz.se">
              foretag@argz.se
            </ExternalLink>{" "}
            eller gå in på vår hemsida{" "}
            <ExternalLink href="https://www.argz.se/" target="_blank">
              ArgZ.se
            </ExternalLink>
          </p>
          <br></br>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3">
              <Image
                alt="image"
                className="rounded"
                height={300}
                src="/argz.jpg"
                width={4000}
              />
              <div className="mt-2 text-center">
                <p>Foto: Casper Lundberg/zFoto</p>
              </div>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle>Sammarbeta med oss!</SectionTitle>
          <p>
            Vi vill att ni ska få ut så mycket som möjligt som kan vara nytta
            till sektionens medlemmar i Automation och Mekatronik. Nedan följer
            förslag på arrangemang som har varit lyckade på Z-teknologsektionen
            men ni är självklart välkomna att komma med egna förslag.
          </p>
          <div className="grid grid-cols-3">
            <div className="col-span-3 items-center justify-center px-4 lg:col-span-1">
              <SecondaryTitle className="mb-2">
                LUNCHFÖRELÄSNINGAR
              </SecondaryTitle>
              <p>
                En möjlighet att få hålla en inspirerande föreläsning om just
                ert företag och vad ni jobbar med för intresserade studenter.
                Information om lunchföreläsning sprids till alla årskurser på
                Z-teknologsektionen vilket gör att budskapet når ut till en bred
                målgrupp, både de som precis börjat studera och även de som
                snart är ute i arbetslivet, och kanske vill börja jobba hos just
                er.
              </p>
              <ul className="mt-2">
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Träffa studenter</p>
                </li>
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Göra reklam</p>
                </li>
                <li className="mb-2 flex items-center">
                  <MdCheckCircle className="mr-2" />
                  <p>Bred målgrupp</p>
                </li>
              </ul>
            </div>
            <div className="col-span-3 items-center justify-center px-4 lg:col-span-1">
              <SecondaryTitle className="mb-2">EVENTS</SecondaryTitle>
              <p>
                Vi i ArgZ strävar alltid efter att arrangera intressanta
                evenemang som ger företag möjligheten att lära känna studenter
                inom Automation och Mekatronik. Genom diskussion och öppna
                dialoger med oss i ArgZ försäkrar vi tillsammans med ert företag
                att anordna ett event som uppfyller de krav och önskemål ni har.
                Det finns många event som vi kan hjälpa er med t.ex.
                CASE-kvällar, studiebesök, mingelkvällar m.m. men vi är alltid
                öppna för förslag. Hör gärna av er till oss om ni är
                intresserade av att arrangera event för z-teknologer tillsammans
                med oss.
              </p>
              <ul className="mt-2">
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Studiebesök</p>
                </li>
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Mingelkvällar</p>
                </li>
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Case-kvällar</p>
                </li>
              </ul>
            </div>
            <div className="col-span-3 items-center justify-center px-4 lg:col-span-1">
              <SecondaryTitle className="mb-2">
                INFORMATIONSSPRIDNING
              </SecondaryTitle>
              <p>
                ArgZ har möjlighet att sprida information genom flera olika
                typer av medium. Här ingår, affischering, inlägg på
                Z-teknologsektionens facebooksida och mailutskick till alla
                studenter på z-teknologsektionen. Självklart finns det
                ytterligare möjligheter för exponering! Hör gärna av er till os
                med egna förslag eller annat.
              </p>
              <ul className="mt-2">
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Veckomail</p>
                </li>
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Hemsida</p>
                </li>
                <li className="mb-2 flex items-center justify-start">
                  <MdCheckCircle className="mr-2" />
                  <p>Reklam</p>
                </li>
              </ul>
            </div>
          </div>
        </SectionWrapper>
      </div>
      <SectionTitle center={true}>
        Intresserad? Kontakta oss på{" "}
        <a
          className="text-blue-500 hover:underline"
          href="mailto:foretag@argz.se"
        >
          foretag@argz.se
        </a>{" "}
        eller gå in på vår hemsida{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://www.argz.se/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ArgZ.se
        </a>
      </SectionTitle>
      <br />
    </>
  );
};

export default BusinessPage;
