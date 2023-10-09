import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import {
  MdAccountBalance,
  MdAnalytics,
  MdCalendarMonth,
  MdFacebook,
  MdMeetingRoom,
  MdReport,
  MdSchool,
} from "react-icons/md";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/utils/utils";

const quickLinks = [
  {
    icon: <MdCalendarMonth />,
    href: "https://cloud.timeedit.net/chalmers/web/public/ri1Y94ygZ05ZZQQ1X05v7Y055Q44x4966g580YQQ657.html",
    text: "Schema",
    tooltip: "TimeEdit",
  },
  {
    icon: <MdMeetingRoom />,
    href: "https://cloud.timeedit.net/chalmers/web/b1/",
    text: "Grupprum",
    tooltip: "Boka grupprum på Chalmers",
  },
  {
    icon: <MdSchool />,
    href: "https://www.chalmers.se/utbildning/dina-studier/",
    text: "Studentportalen",
    tooltip: "Här kan du läsa mer om dina studier",
  },
  {
    icon: <MdAnalytics />,
    href: "https://stats.ftek.se/",
    text: "Tentastatestik",
    tooltip: "Här kan du se tentastatestik för de flesta kurser på Chalmers.",
  },
  {
    icon: <MdAccountBalance />,
    href: "https://www.student.ladok.se/student/app/studentwebb",
    text: "Ladok",
    tooltip: "Här kan du anmäla dig till tentor och se dina resultat.",
  },
  {
    icon: <MdFacebook size={60} />,
    href: "https://www.facebook.com/groups/activityatz",
    text: "Activity@Z",
    tooltip: "Här kommer information om olika arrangemang på sektionen",
  },
  {
    icon: <MdReport size={60} />,
    href: "https://www.chalmers.se/utbildning/dina-studier/studie-och-arbetsmiljo/fysisk-arbetsmiljo/#felanmalan-i-lokalerna",
    text: "Felanmäl lokal",
    tooltip:
      "Här kan du rapportera olika fel eller skador som du hittar på någon av Chalmers lokaler",
  },
];

const StudentPage: NextPage = () => {
  return (
    <>
      <HeadLayout title="Student" />

      <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
        <SectionWrapper className="pt-2">
          <div className="grid grid-cols-7 gap-3">
            {quickLinks.map((link) => (
              <TooltipProvider key={link.text}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className="col-span-1 mx-auto flex flex-col items-center justify-center text-center transition-all hover:scale-105"
                      href={link.href}
                      target="_blank"
                    >
                      <IconContext.Provider
                        value={{
                          color: "black",
                          size: "60",
                        }}
                      >
                        {link.icon}
                      </IconContext.Provider>
                      <p className="text-center text-xs">{link.text}</p>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </SectionWrapper>
        <SectionWrapper className="p-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 my-4  transition-all hover:scale-105">
              <Link href="/student/studentHealth">
                <SecondaryTitle center={true}>Studenthälsa</SecondaryTitle>
                <p className="mx-4 ">
                  Vill du prata med någon eller rapportera något men vet inte
                  riktigt vart du ska vända dig? Klicka här då.
                </p>
              </Link>
            </div>
            <div className="col-span-1 my-4 transition-all hover:scale-105">
              <Link href="/student/new_student">
                <SecondaryTitle center={true}>Söka Z?</SecondaryTitle>
                <p className="mx-4">
                  Funderar du på om Z är rätt pogram för dig? Klicka här
                  isåfall!
                </p>
              </Link>
            </div>
            <div className="col-span-1 my-4 transition-all hover:scale-105">
              <Link href="#snz" scroll={false}>
                <SecondaryTitle center={true}>
                  Påverka dina studier?
                </SecondaryTitle>
                <p className="mx-4">
                  Vill du vara med och påverka dina studier? Klicka här för att
                  få mer information om vad Zätas studienämnd kan hjälpa dig
                  med.
                </p>
              </Link>
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
                Som student på Z-sektionen så finns det massa Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Ratione sapiente natus
                illo neque omnis similique earum placeat possimus corrupti odio
                sequi iste pariatur harum modi iure nam architecto, quia
                delectus.
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
                height={200}
                src="/SNZArm-07.png"
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
                SNZ arbetar nära samman med fakulteten för att utveckla och
                förbättra de olika kurserna som ges inom programmet. De
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
                    buttonVariants({ variant: "outline", size: "lg" })
                  )}
                  href={"https://snz.se"}
                >
                  Gå till snz.se
                </Link>
              </div>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="grid grid-cols-3 py-8">
            <div className="col-span-3 lg:col-span-2 lg:pr-20">
              <SectionTitle className="mb-4">Sektionen</SectionTitle>
              <p>
                Sektionen leds av Sektionsstyrelsen, Ztyret, som består av 6
                förtroendevalda. De förtroendevalda är invalda postspecifikt och
                sitter i ett år. De sex posterna är: Ordförande, Vice
                ordförande, Ekonomiansvarig, Informationsansvarig,
                Nöjeslivsansvarig och SAMO. Sektionsstyrelsen lyder under
                sektionsmötet som sammanträder minst fyra gånger per år.
                Sektionsföreningar och -utskott ligger under sektionen och är
                till för gemene teknolog. De kan antingen finnas för att främja
                ett specifikt intresse, exempelvis idrott eller en sittning,
                eller för att utföra ett uppdrag, till exempel anordna
                mottagning eller trycka en tidning.
              </p>
            </div>
            <div className="col-span-3 m-auto mt-8 lg:col-span-1 lg:mt-0">
              <Image
                alt="Sektionens uppbyggnad"
                height={250}
                src="/sektionens_uppbyggnad.png"
                width={300}
              />
              <p className="mt-4 text-center">Sektionens uppbyggnad</p>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default StudentPage;
