import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import {
  MdAccountBalance,
  MdAnalytics,
  MdCalendarMonth,
  MdEmail,
  MdFacebook,
  MdInfo,
  MdMeetingRoom,
  MdReport,
  MdSchool,
} from "react-icons/md";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import ssg from "~/server/api/helpers/ssg";
import { api } from "~/utils/api";
import { cn } from "~/utils/utils";

const quickLinks = [
  {
    icon: <MdCalendarMonth size={"3em"} />,
    href: "https://cloud.timeedit.net/chalmers/web/public/",
    text: "Schema",
    tooltip: "TimeEdit",
  },
  {
    icon: <MdMeetingRoom size={"3em"} />,
    href: "https://cloud.timeedit.net/chalmers/web/b1/",
    text: "Grupprum",
    tooltip: "Boka grupprum på Chalmers",
  },
  {
    icon: <MdSchool size={"3em"} />,
    href: "https://www.chalmers.se/utbildning/dina-studier/",
    text: "Studentportalen",
    tooltip: "Här kan du läsa mer om dina studier",
  },
  {
    icon: <MdAnalytics size={"3em"} />,
    href: "https://stats.ftek.se/",
    text: "Tentastatistik",
    tooltip: "Här kan du se tentastatestik för de flesta kurser på Chalmers.",
  },
  {
    icon: <MdAccountBalance size={"3em"} />,
    href: "https://www.student.ladok.se/student/app/studentwebb",
    text: "Ladok",
    tooltip: "Här kan du anmäla dig till tentor och se dina resultat.",
  },
  {
    icon: <MdFacebook size={"3em"} />,
    href: "https://www.facebook.com/groups/activityatz",
    text: "Activity@Z",
    tooltip: "Här kommer information om olika arrangemang på sektionen",
  },
  {
    icon: <MdReport size={"3em"} />,
    href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna",
    text: "Felanmäl lokal",
    tooltip:
      "Här kan du rapportera olika fel eller skador som du hittar på någon av Chalmers lokaler",
  },
];
const StudentPage: NextPage = () => {
  const { data, isLoading, isError } = api.programBoard.getAll.useQuery();
  return (
    <>
      <HeadLayout title="Student" />

      <div className="container mx-auto mt-8 divide-y-4 divide-zDarkGray divide-opacity-20">
        <SectionWrapper className="pt-2">
          <TooltipProvider>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-7">
              {quickLinks.map((link) => (
                <Tooltip key={link.text}>
                  <TooltipTrigger asChild>
                    <Link
                      className="col-span-1 mx-auto flex flex-col items-center justify-center rounded-lg text-center transition-all hover:ring hover:ring-zWhite"
                      href={link.href}
                      target="_blank"
                    >
                      <IconContext.Provider
                        value={{
                          color: "black",
                        }}
                      >
                        {link.icon}
                      </IconContext.Provider>
                      <p className="text-center text-xs">{link.text}</p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zWhite">
                    <p>{link.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </SectionWrapper>
        <SectionWrapper className="p-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 my-4 flex flex-col rounded-md">
              <div className="pb-4">
                <SecondaryTitle center={true}>
                  Studiesocialt stöd
                </SecondaryTitle>
                <p className="mx-4">
                  Vill du prata med någon, är orolig över dina studier eller
                  rapportera vill något men vet inte riktigt vart du ska vända
                  dig? Klicka här då.
                </p>
              </div>
              <Button
                className="mx-auto mt-auto block w-fit transition-all hover:ring hover:ring-zWhite"
                variant={"outline"}
                asChild
              >
                <Link href="/student/student-health">
                  Mer om studiesocialt stöd
                </Link>
              </Button>
            </div>
            <div className="col-span-1 my-4 flex flex-col rounded-md">
              <div className="pb-4">
                <SecondaryTitle center={true}>Söka Z?</SecondaryTitle>
                <p className="mx-4">
                  Funderar du på om Z är rätt pogram för dig? Klicka här isåfall
                  för att läsa mer om programmet och vad du kan förvänta dig!
                </p>
              </div>
              <Button
                className="mx-auto mt-auto block w-fit transition-all hover:ring hover:ring-zWhite"
                variant={"outline"}
                asChild
              >
                <Link href="/student/new-student">Mer information</Link>
              </Button>
            </div>
            <div className="col-span-1 my-4 flex flex-col rounded-md">
              <div className="pb-4">
                <SecondaryTitle center={true}>
                  Påverka dina studier?
                </SecondaryTitle>
                <p className="mx-4">
                  Vill du vara med och påverka dina studier? Klicka här för att
                  få mer information om vad Zätas studienämnd kan hjälpa dig
                  med.
                </p>
              </div>
              <Button
                className="mx-auto mt-auto block w-fit transition-all hover:ring hover:ring-zWhite"
                variant={"outline"}
                asChild
              >
                <Link href="#snz" scroll={false}>
                  Mer information
                </Link>
              </Button>
            </div>
          </div>
          {/* 
        Vad vill jag ha här?
        Studiehälsa
        Zaloonen 
        SNZ-bös */}
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-2 md:pr-20">
              <SectionTitle className="mb-4">Student</SectionTitle>
              <p>
                Som student på Chalmers och Z-programmet finns det många olika
                möjligheter att få hjälp och möjlighet att påverka dina studier.
                Här nedanför finns lite information om vad som finns
                tillgängligt för dig som student och information om programmet.
                Programmets studieplan hittar du på{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  href={
                    "https://www.chalmers.se/utbildning/hitta-program/automation-och-mekatronik-civilingenjor/"
                  }
                  target="_blank"
                >
                  Chalmers hemsida
                </Link>{" "}
                där du också kan läsa mer om de olika kurserna som du läser
                varje år. Som student på Z-programmet har man stor möjlighet att
                välja olika mastrar beroende på intresseområde då över 20 olika
                masterprogram är valbara för Z-studenter. Alla masterprogram och
                dess specifika förkunskapskrav hittar du på samma sida som
                programplanen.
              </p>
            </div>
            <div className="col-span-3 mx-auto mt-4 md:col-span-1 md:my-auto">
              <Image
                alt="image"
                className="rounded"
                height={600}
                src="/z_student.jpg"
                width={600}
              />
              <p className="mt-2 text-center">Foto: Casper Lundberg/zFoto</p>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper id="snz">
          <div className="grid grid-cols-3">
            <div className="order-last col-span-3 m-auto lg:order-first lg:col-span-1">
              <Image
                alt="image"
                className="rounded"
                height={250}
                src="/SNZ.png"
                width={250}
              />
              <div className="mt-0 text-center">
                <p>
                  <strong>SNZ</strong> - sektionens studienämnd.
                </p>
              </div>
            </div>
            <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
              <SectionTitle className="mb-4">Påverka dina studier</SectionTitle>
              <p>
                Automation och Mekatronik har en dedikerad Studienämnd som heter
                SNZ och inriktar sig på att främja en högkvalitativ och givande
                utbildning inom sektionens programplan. SNZ har en central roll
                i sektionens verksamhet och utbildningsarbete.
                <br />
                <br />
                SNZ arbetar nära samman med programledningen för att utveckla
                och förbättra de olika kurserna som ges inom programmet. De
                övervakar kurserna och utvärderar deras kvalitet för att
                säkerställa att studenterna får den bästa möjliga utbildningen.
                Feedback från studenter är oerhört viktig för dem, och de
                arbetar aktivt med att ta emot och behandla detta för att
                ständigt förbättra utbildningen.
                <br />
                <br />
                SNZ består av medlemmar från sektionen och möts regelbundet för
                att diskutera och påverka utbildningsfrågor genom möten med
                programansvariga och föreläsare. På SNZ:s hemsida kan du få mer
                information om kommitténs arbete, deras medlemmar och deras
                pågående projekt och initiativ inom sektionen. Om du har frågor
                eller feedback gällande utbildning inom programmet kan du
                kontakta SNZ via deras hemsida.
              </p>
              <div className="mx-auto mt-2 block w-fit">
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                  )}
                  href={"https://snz.se"}
                  target="_blank"
                >
                  Gå till snz.se
                </Link>
              </div>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionTitle className="mb-4">Programledningen</SectionTitle>
          <p>
            Z-programmet har en programledning som består av programansvarig,
            studievägledare och utbildningssekreterare. Programledningen jobbar
            med att säkra framtida kompetens inom Z-programmet och övervaka den
            nuvarande studieplanen. De arbetar också med att utveckla och
            förbättra programmet genom att ta emot och behandla feedback från de
            studenter som går på programmet.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {isLoading && <p>Försöker hämta programledningens medlemmar...</p>}
            {isError && <p>Kunde inte hämta programledningens medlemmar</p>}
            {data &&
              data.map((person) => (
                <div
                  key={person.role}
                  className="mx-auto mt-2 block w-fit grid-cols-1 text-center"
                >
                  <SecondaryTitle className="mb-4">
                    {person.role}
                  </SecondaryTitle>
                  <Image
                    alt={person.name}
                    className="mx-auto rounded-full"
                    height={200}
                    src={person.image ? person.image : "/logo.png"}
                    width={200}
                  />
                  <p className="text-lg font-semibold">{person.name}</p>
                  <ul className="ml-3 mt-2">
                    <li className="mb-2 flex items-center justify-center md:justify-start">
                      <MdEmail />
                      <Link
                        className="ml-1 hover:underline"
                        href={`mailto:${person.email}`}
                        target="_blank"
                      >
                        {person.email}
                      </Link>
                    </li>
                    <li className="mb-2 flex items-center justify-center md:justify-start">
                      <MdInfo />
                      <Link
                        className="ml-1 hover:underline"
                        href={person.url}
                        target="_blank"
                      >
                        Mer information
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default StudentPage;
export const getStaticProps: GetStaticProps = async () => {
  await ssg.programBoard.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
