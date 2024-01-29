import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { courseData } from "~/data/courseData";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const PROGRAMANSVARIG_KEY = "Programansvarig";

const NewStudent: NextPage = () => {
  const { data, isLoading, isError } = api.programBoard.getOneByRole.useQuery({
    role: PROGRAMANSVARIG_KEY,
  });
  return (
    <>
      <HeadLayout title="Ny Student" />
      <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
        <SectionWrapper>
          <div className="grid grid-cols-3">
            <div className="order-last col-span-3 m-auto lg:order-first lg:col-span-1">
              {(data || isLoading) && (
                <Image
                  alt="image"
                  className="rounded"
                  height={400}
                  src={data?.image ? data.image : "/logo.png"}
                  width={400}
                />
              )}
              {data && (
                <div className="mt-2 text-center">
                  <p>
                    <strong>{data.name}</strong> - programansvarig
                  </p>
                  <Link
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    href={`mailto:${data.email}`}
                    target="_blank"
                  >
                    {data.email}
                  </Link>
                </div>
              )}
              {isError && (
                <div className="mt-2 text-center">
                  <p>Kunde inte hämta programansvarig... </p>
                </div>
              )}
            </div>
            <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
              <SectionTitle className="mb-4">En bra kombination</SectionTitle>
              <p>
                Z-programmet är en unik utbildning som erbjuder en bra
                kombination av elektro-, maskin- och datateknik. Genom att
                sammanföra dessa tre discipliner skapas en utbildningsmiljö där
                studenter får en bred kunskapsbas och en djup förståelse för
                teknikens olika aspekter. Inom automation och mekatronik får
                studenter möjlighet att utforska och integrera avancerade
                teknologier inom elektronik, maskinkonstruktion och
                dataprogrammering. Genom att lära sig att designa och
                implementera smarta och effektiva system kan de möta framtidens
                utmaningar inom industriell automation och robotik.
                {/* TODO: Skriv om masterprogram osv */}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Elektroteknik</h3>
                  <p>
                    Elektroteknikens kunskaper ger studenterna en grundläggande
                    förståelse för elektroniska kretsar, mätningar och
                    styrningssystem. Detta ger en bra grund inför kommande
                    kurser inom reglerteknik.
                  </p>
                </div>
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Maskinteknik</h3>
                  <p>
                    Maskintekniken ger studenter förmågan att designa och
                    utveckla mekaniska system och komponenter, från idé till
                    färdig produkt.
                  </p>
                </div>
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Datateknik</h3>
                  <p>
                    Datatekniken ger teknologer verktygen för att programmera
                    och hantera data för att optimera och automatisera
                    processer. Det förbereder också studenterna inför kommande
                    utmaningar inom AI och datavetenskap.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p>
            Genom att kombinera dessa discipliner kan studenter inom automation
            och mekatronik skapa innovativa lösningar för att förbättra
            produktiviteten, effektiviteten och säkerheten i industriella och
            tekniska tillämpningar. De blir väl rustade att arbeta inom en rad
            olika branscher, såsom tillverkning, automation, fordonsindustrin
            och forskning. På Chalmers erbjuds studenter inom automation och
            mekatronik en dynamisk och stimulerande utbildningsmiljö, där de får
            möjlighet att delta i projekt och laborationer, samarbeta med
            forskare och experter inom området och utforska den senaste tekniken
            inom automation och mekatronik. Studenter vid Z-programmet kan välja
            på 21 olika mastrar, varav en ägs av Z,&nbsp;
            <a
              className="text-blue-600 hover:underline dark:text-blue-500"
              href="https://www.chalmers.se/en/education/find-masters-programme/systems-control-and-mechatronics-msc/"
              target="_blank"
            >
              Systemteknik, reglerteknik och mekatronik
            </a>
            .
          </p>
        </SectionWrapper>
        <SectionWrapper>
          <div className="grid grid-cols-3">
            <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
              <SectionTitle className="mb-4">Mottagningen</SectionTitle>
              <p>
                Mottagningen syftar till att underlätta din integration både
                socialt och akademiskt. Detta åstadkoms genom fyra intensiva
                veckor av engagerande aktiviteter. Genom varierande aktiviteter
                får du möjlighet att lära känna dina medstudenter på sektionen.
                Det viktigaste är att du närmar dig denna period med en positiv
                inställning och är redo att njuta av varje stund! Det är normalt
                att känna nervositet inför mottagningen, men kom ihåg att du
                inte är ensam. Mottagningskommiten och deras phaddrar kommer
                göra sitt bästa för att se till att din mottagning blir
                fantastisk, men det är du som formar din egen upplevelse. Så kom
                med ett öppet sinne och var redo att ha roligt!
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-2">
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">
                    Samling på Götaplatsen första dagen
                  </h3>
                  <p>
                    Första dagen, 15 augusti 2023, är det samling på
                    Götaplatsen. Efter en festlig välkomstceremoni tågar alla
                    tillsammans upp till Chalmers campus. Därefter börjar
                    mottagningen.
                  </p>
                </div>
                <div className="border-gradient rounded-lg">
                  <h3 className="mb-4 text-xl font-semibold">Redan antagen?</h3>
                  <p>
                    Tryck på denna knapp om du är antagen för mer information
                    från vår mottagningskommite
                  </p>
                  <Button
                    className="mx-auto block"
                    onClick={() =>
                      window.open("https://www.znollk.se/", "_blank")
                    }
                    variant="outline"
                  >
                    Antagen
                  </Button>
                </div>
              </div>
            </div>
            <div className="order-last col-span-3 m-auto lg:order-last lg:col-span-1">
              <Image
                alt="image"
                className="rounded"
                height={400}
                src="/nollbricka.jpg"
                width={400}
              />
              <div className="mt-2 text-center">
                <p>
                  <strong>Dennis Holmström</strong> /zFoto
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle className="text-center">Kurser</SectionTitle>
          <p className="text-left">
            På Chalmers inleds civilingenjörsprogrammen med tre år av varierande
            studier som bygger upp en gedigen teknisk kompetens. Första året på
            Automation & Mekatronik fokuserar på grundläggande ämnen som
            matematik, programmering och fysik. Under det andra året
            introduceras kärnkurser inom automation, reglerteknik och
            elektronik. Det tredje året markerar en fördjupning genom avancerade
            kurser inom mekatronik, realtidsystem och instrumentering. Under
            detta år får studenten välja kurser som passar deras intressen, och
            under våren genomförs kandidatarbete. Efter dessa tre år väljer
            studenterna ett masterprogram för ytterligare specialisering och
            fördjupning inom sitt valda område. Denna strukturerade progression
            ger studenterna möjlighet att successivt specialisera sig och skapar
            en stark teknisk grund för framtida studier och en karriär inom
            automations- och mekatroniksektorn. Nedan följer en översikt över de
            kurser som ingår under de tre första åren, tryck på en kurs för att
            läsa mer
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TooltipProvider>
              {Object.entries(courseData).map(([year, periods], yearIndex) => (
                <div key={yearIndex} className="rounded border p-4 shadow">
                  <h2 className="mb-2 text-center text-xl font-bold">{year}</h2>
                  {Object.entries(periods).map(
                    ([period, courses], periodIndex) => (
                      <div key={periodIndex} className="mb-4">
                        <h3 className="mb-1 border-b border-gray-400 text-lg font-semibold">
                          {period}
                        </h3>
                        {courses.map(
                          (
                            { courseName, points, followUp, url },
                            courseIndex,
                          ) => (
                            <div
                              key={courseIndex}
                              className="mb-1 flex flex-row justify-between text-slate-500"
                            >
                              <div className="shrink">
                                <Tooltip>
                                  <TooltipTrigger>
                                    <a
                                      className="line-clamp-1 text-left font-medium hover:text-blue-500"
                                      href={url}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      {courseName}
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>{courseName}</TooltipContent>
                                </Tooltip>
                              </div>
                              <div className="flex shrink-0 items-center">
                                {followUp && (
                                  <em className="mr-2 text-xs text-red-500">
                                    Fortsättning
                                  </em>
                                )}
                                <p className="mr-2 text-sm text-gray-600">
                                  {points} HP
                                </p>
                              </div>
                            </div>
                          ),
                        )}
                        {courses.length < 3 &&
                          Array.from({ length: 3 - courses.length }).map(
                            (_, i) => (
                              <div key={i} className="invisible">
                                Invisible Course
                              </div>
                            ),
                          )}
                      </div>
                    ),
                  )}
                </div>
              ))}
            </TooltipProvider>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default NewStudent;

export const getStaticProps: GetStaticProps = async () => {
  await ssg.programBoard.getOneByRole.prefetch({ role: PROGRAMANSVARIG_KEY });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
