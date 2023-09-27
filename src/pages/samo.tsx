import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { MdEmail, MdInfo, MdPhone, MdReport } from "react-icons/md";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import CommitteeImage from "~/components/organ/CommitteeImage";
import ssg from "~/server/api/helper/ssg";
import { api } from "~/utils/api";

const SAMO_EMAIL_KEY = "samo.ztyret@ztek.se";

const SamoPage: NextPage = () => {
  const { data } = api.member.getOneByEmail.useQuery({
    email: SAMO_EMAIL_KEY,
  });

  return (
    <>
      <HeadLayout title="Studenthälsa" />
      <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
        <SectionWrapper>
          <div className="grid grid-cols-3 py-8">
            <div className="col-span-3 md:col-span-2 md:pr-20">
              <SectionTitle className="pb-4">Studenthälsa</SectionTitle>
              <p>
                Som student på Z och på Chalmers är det viktigt att känna sig
                säker och må bra, vilket inte alltid är lätt. Det är viktigt att
                känna till att som medlem i Chalmers Studentkår finns Kåren
                alltid som ett stöd. Som medlem i Kåren har du tillgång till
                samtal med Kurator, Präst, Feelgood Studenthälsa,
                Studievägledare m.m. Trygg på Chalmers är även bra att känna
                till då de hanterar incidenter och kan hjälpa dig som blivit
                utsatt för eller sett och upplevt trakasserier på Chalmers. Att
                rapportera incidenter till Trygg på Chalmers är viktigt då det
                hjälper studentkåren att förebygga samt föra statistik på vad
                som händer på högskolan. Skulle man inte vilja vända sig till
                högskolan eller centrala kåren så kan man också vända sig till
                SAMO här på sektionen.
              </p>
            </div>
            <div className="col-span-3 mx-auto mt-4 md:col-span-1 md:my-auto">
              <a
                href="https://chalmersstudentkar.se/feel_safe/"
                target="_blank"
              >
                <Image
                  alt="image"
                  className="hover:opacity-75 hover:transition-all"
                  height={500}
                  src="/feeling_safe_student_union.png"
                  width={500}
                />
              </a>
              <p className="mt-4 text-center">Kårens hemsida om studenthälsa</p>
            </div>
          </div>
          {/* divide-x divide-gray-400 borde ligga på nästa class men funkar inte */}
          <div className="grid grid-cols-1 justify-items-center py-2 sm:grid-cols-2  md:grid-cols-3">
            <div className="col-span-1">
              <SecondaryTitle>Trygg på Chalmers</SecondaryTitle>
              <ul className="mt-6">
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdInfo className="mr-2" />
                  <a
                    className="hover:underline"
                    href="https://www.chalmers.se/om-chalmers/organisation-och-styrning/trygg-pa-chalmers/"
                  >
                    Mer information
                  </a>
                </li>
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdReport className="mr-2" />
                  <a
                    className="hover:underline"
                    href="https://www.chalmers.se/om-chalmers/organisation-och-styrning/trygg-pa-chalmers/rapportera-en-handelse/"
                    target="_blank"
                  >
                    Rapportera en händelse
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <SecondaryTitle>Sociala enhetens ordförande</SecondaryTitle>
              <ul className="mt-6">
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdEmail className="mr-2" />
                  <a
                    className="hover:underline"
                    href="mailto:so@chalmersstudentkar.se"
                  >
                    so@chalmersstudentkar.se
                  </a>
                </li>
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdPhone className="mr-2" />
                  <a className="hover:underline" href="tel:031-772 39 18">
                    031-772 39 18
                  </a>
                </li>
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdInfo className="mr-2" />
                  <a
                    className="hover:underline"
                    href="https://chalmersstudentkar.se/feel_safe/"
                    target="_blank"
                  >
                    Mer information från kåren
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <SecondaryTitle>Studievägledare Anders Ankén</SecondaryTitle>
              <ul className="mt-6">
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdEmail className="mr-2" />
                  <a
                    className="hover:underline"
                    href="mailto:anders.anken@chalmers.se"
                  >
                    anders.anken@chalmers.se
                  </a>
                </li>
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdInfo className="mr-2" />
                  <a
                    className="hover:underline"
                    href="https://www.chalmers.se/utbildning/studentstod/"
                    target="_blank"
                  >
                    Mer information om studiestöd
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="grid grid-cols-3 py-8">
            <div className="order-last col-span-3 m-auto lg:order-first lg:col-span-1">
              <CommitteeImage
                alt={`Profilbild på ${data ? data.name : "SAMO"}`}
                filename={data ? data.image : ""}
              />
              {data && data.image !== "" ? (
                <p className="text-center">{data.name}, SAMO på sektionen.</p>
              ) : (
                <p className="text-center">Profilbild saknas</p>
              )}
            </div>
            <div className="col-span-3 md:col-span-2 md:pl-20">
              <SectionTitle className="break-words pb-4">
                Studerande ArbetsMiljöOmbud (SAMO)
              </SectionTitle>
              <p>
                Mitt namn är {data ? data.name : "(namn saknas)"} och jag sitter
                som SAMO i styrelsen för Automation & Mekatronik. Det är min
                uppgift att jobba mot att förbättra studiemiljön i de lokaler du
                som Z-student har tillgång till. Det är även min uppgift att
                jobba mot en bättre studenthälsa genom att ha en bra psykosocial
                studiemiljö. Mig kan du nå via mejl, personligen eller via det
                anonyma formuläret ovanför. Om du känner behov av att komma i
                kontakt med någon, men inte vet vart du skall vända dig kan du
                kontakta mig.
              </p>
              <ul className="mt-6">
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdEmail className="mr-2" />
                  <a
                    className="hover:underline"
                    href={`mailto:${data ? data.email : "samo@ztek.se"}`}
                  >
                    {data ? data.email : "samo@ztek.se"}
                  </a>
                </li>
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <MdPhone className="mr-2" />

                  <a href={`tel:${data ? data.phone : ""}`}>
                    {data ? data.phone : "Inget telefonnummer finns"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="grid grid-cols-2 py-8">
            <div className="col-span-2 lg:col-span-1 lg:pr-20">
              <SectionTitle className="pb-4">Informera SAMO</SectionTitle>
              <p>
                För att du ska kunna förmedla information anonymt till SAMO
                (eller hela styrelsen) erbjuds ett särskilt formulär. Detta
                formulär kan användas för olika ändamål:
              </p>
              <ul className="my-2 list-disc px-4">
                <li>
                  För att delge information utan att avslöja din identitet,
                  särskilt när ämnet är känsligt eller om du inte önskar att
                  ditt namn avslöjas. Denna funktion möjliggör rapportering av
                  ärenden som kan röra dig själv eller andra.
                </li>
                <li>
                  För att rapportera arbetsmiljörelaterade problem och
                  felaktigheter.
                </li>
                <li>
                  För att förmedla generell information eller ärenden som du
                  anser att bara SAMO eller hela Ztyret bör vara medvetna om.
                </li>
              </ul>
              <p>
                Du har även möjlighet att självständigt ange dina
                kontaktuppgifter om du önskar återkoppling, vilket kan ses som
                ett komplement till att skicka e-post. Du har också möjlighet
                att välja om endast SAMO ska få tillgång till den inskickade
                informationen eller om hela styrelsen ska vara informerad. För
                ytterligare information och detaljer, rekommenderas att du
                konsulterar det specifika formuläret.
              </p>
            </div>
            <div className="col-span-2 mt-4 h-96 w-full lg:col-span-1 lg:mt-0 lg:h-full">
              <iframe
                className="aspect-auto h-full w-full"
                src="https://docs.google.com/forms/d/e/1FAIpQLSckHuuypoZ0AhazgZpA8V8FjClU1um5bm5STzbfp1rw78ARZQ/viewform?embedded=true"
                title="Informera SAMO"
              >
                Läser in …
              </iframe>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default SamoPage;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.member.getOneByEmail.prefetch({ email: SAMO_EMAIL_KEY });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
