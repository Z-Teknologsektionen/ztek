import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import HeadLayout from "~/components/layout/HeadLayout";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button } from "~/components/ui/button";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";

const sixHp = <span className="font-bold"> [6HP]</span>;
const sevenHp = <span className="font-bold"> [7.5HP]</span>;
const nineHp = <span className="font-bold"> [9HP]</span>;

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
              <p className="mr-0 md:mr-12">
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
            På Chalmers inleds civilingenjörsprogrammenmed tre år av varierande
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
            automations- och mekatroniksektorn.
          </p>
          <div className="hidden lg:block">
            <div className="flex items-center justify-center">
              <div className="margin-100 grid grid-cols-3 gap-1 gap-x-10 p-10 shadow-md">
                <div className="text-center font-semibold dark:text-gray-400 md:text-lg">
                  Årskurs 1
                </div>
                <div className="text-center font-semibold dark:text-gray-400 md:text-lg">
                  Årskurs 2
                </div>
                <div className="text-center font-semibold dark:text-gray-400 md:text-lg">
                  Årskurs 3
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 1
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 1
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 1
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Inledande matematik{sixHp}</li>
                    <li>Inledande programmering{sixHp}</li>
                    <li>Introduktion till automation och mekatronik{sixHp}</li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Matematisk statistik{sixHp}</li>
                    <li>Mekanik 2{sixHp}</li>
                    <li>Intelligent automation{sixHp}</li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Introduktion till maskininlärning{sixHp}</li>
                    <li>Systemkonstruktion{nineHp}</li>
                    <li>Valbar kurs{sevenHp}</li>
                  </ul>
                </div>

                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 2
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 2
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 2
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Matematisk analys i en variabel{sixHp}</li>
                    <li>Elektriska kretsar{sixHp}</li>
                    <li>
                      Introduktion till automation och mekatronik -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Datastruktuer och algoritmer{sixHp}</li>
                    <li>Mätteknik{sixHp}</li>
                    <li>
                      Intelligent automation -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>
                      Introduktion till maskininlärning -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                    <li>
                      Systemkonstruktion -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {nineHp}
                    </li>
                    <li>Valbar kurs{sevenHp}</li>
                  </ul>
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 3
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 3
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 3
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Linjär algebra{sixHp}</li>
                    <li>Mekanik 1{sixHp}</li>
                    <li>Grundläggande datorteknik{sixHp}</li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Elektriska drivsystem och fält{sixHp}</li>
                    <li>Signaler och system{sixHp}</li>
                    <li>
                      Simulering och optimering av hållbara produktionssystem
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Valbar kurs{sevenHp}</li>
                    <li>Kandidatarbete{sevenHp}</li>
                  </ul>
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 4
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 4
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 4
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Matematisk analys i flera variabler{sixHp}</li>
                    <li>Maskinorienterad programmering{sixHp}</li>
                    <li>
                      Grundläggande datorteknik -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Ekonomi och organisation{sixHp}</li>
                    <li>Reglerteknik{sixHp}</li>
                    <li>
                      Simulering och optimering av hållbara produktionssystem -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="border-t-2 border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Valbar kurs{sevenHp}</li>
                    <li>
                      Kandidatarbete -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sevenHp}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <div className="flex items-center justify-center">
              <div className="margin-100 gap-1 gap-x-10 p-10 shadow-md md:grid md:grid-cols-1 lg:grid-cols-3">
                <div className="text-center font-semibold dark:text-gray-400 md:text-lg">
                  Årskurs 1
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 1
                </div>
                <div className="border-t border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Inledande matematik{sixHp}</li>
                    <li>Inledande programmering{sixHp}</li>
                    <li>Introduktion till automation och mekatronik{sixHp}</li>
                  </ul>
                </div>

                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 2
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Matematisk analys i en variabel{sixHp}</li>
                    <li>Elektriska kretsar{sixHp}</li>
                    <li>
                      Introduktion till automation och mekatronik -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>

                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 3
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Linjär algebra{sixHp}</li>
                    <li>Mekanik 1{sixHp}</li>
                    <li>Grundläggande datorteknik{sixHp}</li>
                  </ul>
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 4
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Matematisk analys i flera variabler{sixHp}</li>
                    <li>Maskinorienterad programmering{sixHp}</li>
                    <li>
                      Grundläggande datorteknik -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="mt-5 text-center font-semibold dark:text-gray-400 md:text-lg">
                  Årskurs 2
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 1
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Matematisk statistik{sixHp}</li>
                    <li>Mekanik 2{sixHp}</li>
                    <li>Intelligent automation{sixHp}</li>
                  </ul>
                </div>

                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 2
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Datastruktuer och algoritmer{sixHp}</li>
                    <li>Mätteknik{sixHp}</li>
                    <li>
                      Intelligent automation -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>

                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 3
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Elektriska drivsystem och fält{sixHp}</li>
                    <li>Signaler och system{sixHp}</li>
                    <li>
                      Simulering och optimering av hållbara produktionssystem
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 4
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Ekonomi och organisation{sixHp}</li>
                    <li>Reglerteknik{sixHp}</li>
                    <li>
                      Simulering och optimering av hållbara produktionssystem -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                  </ul>
                </div>
                <div className="mt-5 text-center font-semibold dark:text-gray-400 md:text-lg">
                  Årskurs 3
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 1
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Introduktion till maskininlärning{sixHp}</li>
                    <li>Systemkonstruktion{nineHp}</li>
                    <li>Valbar kurs{sevenHp}</li>
                  </ul>
                </div>

                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 2
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>
                      Introduktion till maskininlärning -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sixHp}
                    </li>
                    <li>
                      Systemkonstruktion -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {nineHp}
                    </li>
                    <li>Valbar kurs{sevenHp}</li>
                  </ul>
                </div>

                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 3
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Valbar kurs{sevenHp}</li>
                    <li>Kandidatarbete{sevenHp}</li>
                  </ul>
                </div>
                <div className="mb-1 text-gray-500 dark:text-gray-400 md:text-lg">
                  Läsperiod 4
                </div>
                <div className="border-t  border-gray-400">
                  <ul className="mt-2 list-inside list-disc space-y-1 pl-5 text-xs">
                    <li>Valbar kurs{sevenHp}</li>
                    <li>
                      Kandidatarbete -{" "}
                      <em className="font-bold">Fortsättning</em>
                      {sevenHp}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
