import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import CommitteeImage from "~/components/organ/CommitteeImage";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import ssg from "~/server/api/helper/ssg";
import { api } from "~/utils/api";

const DOCUMENTGROUP_KEY = "Mallar för sektionsmötet";
const StudentDivision: NextPage = () => {
  const {
    data: documentData,
    isLoading: documentIsLoading,
    isError: documentIsError,
  } = api.document.getOneGroupByName.useQuery({
    name: DOCUMENTGROUP_KEY,
  });

  const { data: committeeData } = api.committee.getAll.useQuery();
  return (
    <>
      <HeadLayout title="Sektionen" />

      <div className="container mx-auto divide-y-4 divide-zDarkGray divide-opacity-20">
        <SectionWrapper className="p-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 my-4 flex flex-col rounded-md">
              <div className="pb-4">
                <SecondaryTitle center={true}>Zaloonen</SecondaryTitle>
                <p className="mx-4">
                  Zaloonen är Zätas sektionslokal som gemene Z-teknolog kan boka
                  själv. Här hålls sittningar, pluggkvällar och annat dylikt.
                </p>
              </div>
              <Button
                className="mx-auto mt-auto block w-fit transition-all hover:ring hover:ring-zWhite"
                variant={"outline"}
                asChild
              >
                <Link href="/student-division/zaloonen">
                  Ta mig till Zaloonen!
                </Link>
              </Button>
            </div>
            <div className="col-span-1 my-4 flex flex-col rounded-md">
              <div className="pb-4">
                <SecondaryTitle center={true}>
                  Vill du också engagera dig?
                </SecondaryTitle>
                <p className="mx-4">
                  Sektionen drivs av frivilligt engagerade studenter som genom
                  våra kommittéer och föreningar försöker göra din studietid så
                  bra som möjligt! Om du också vill vara med och engagera dig,
                  läs mer här.
                </p>
              </div>
              <Button
                className="mx-auto mt-auto block w-fit transition-all hover:ring hover:ring-zWhite"
                variant={"outline"}
                asChild
              >
                <Link href="#organ" scroll={false}>
                  Mer om azpning
                </Link>
              </Button>
            </div>
            <div className="col-span-1 my-4 flex flex-col rounded-md">
              <div className="pb-4">
                <SecondaryTitle center={true}>
                  Var med och påverka!
                </SecondaryTitle>
                <p className="mx-4">
                  Saknar du något här på sektionen eller vill du starta ett nytt
                  utskott? Här kan du få mer information om hur du ska gå
                  tillväga.
                </p>
              </div>
              <Button
                className="mx-auto mt-auto block w-fit transition-all hover:ring hover:ring-zWhite"
                variant={"outline"}
                asChild
              >
                <Link href="#sektionsmote" scroll={false}>
                  Mer information
                </Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-2 md:pr-20">
              <SectionTitle className="mb-4">Z-Teknologsektionen</SectionTitle>
              <p>
                Teknologsektionen för Automation och Mekatronik vid Chalmers
                Studentkår är en ideell förening som har till uppgift att verka
                för sammanhållning mellan sina medlemmar och skall tillvarata
                deras gemensamma intressen i främst utbildningsfrågor och
                studiesociala frågor.
                <br />
                <br />
                Som Z-student på Chalmers är du automatiskt medlem i Chalmers
                studentkår och därmed också i Z-Teknologsektionen. Sektionen
                erbjuder många möjligheter att få ut mer av din studietid. Du
                kan engagera dig i sektionens verksamhet, delta i olika
                arrangemang och aktiviteter, eller bara hänga med dina vänner i
                sektionslokalen.
                <br />
                <br />
                Sektionen leds av Sektionsstyrelsen, Ztyret, som består av 6
                förtroendevalda. Sektionsstyrelsen lyder under sektionsmötet som
                sammanträder minst fyra gånger per år. Sektionsföreningar och
                -utskott ligger under sektionen och är till för gemene teknolog.
                De kan antingen finnas för att främja ett specifikt intresse,
                exempelvis idrott eller en sittning, eller för att utföra ett
                uppdrag, till exempel anordna mottagning eller trycka en
                tidning. Sektionen kan också tillsätta arbetsgrupper för
                specifika ändamål.
                <br />
                <br />
                Sektionen regleras stadgan, reglementet och andra styrdokument.
                För att uppdatera reglementet måste en proposition eller motion
                röstas igenom på ett sektionsmöte. Vid ändringar av stadga måste
                motionen eller propositionen röstas igeom på två sektionsmöten i
                följd. Sektionens olika styrdokument hittar du{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  href="/documents"
                >
                  här
                </Link>
                .
              </p>
            </div>
            <div className="col-span-3 m-auto mt-8 md:col-span-1 lg:mt-0">
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
        <SectionWrapper id="sektionsmote">
          <div className="grid grid-cols-3">
            <div className="order-last col-span-3 mx-auto mt-2 lg:order-first lg:col-span-1">
              <div className="grid grid-cols-3 md:grid-cols-4">
                {documentIsLoading && <p>Läser in dokument...</p>}
                {documentIsError && <p>Dokument kunde inte hämtas.</p>}
                {documentData &&
                  documentData.Document.map((doc) => (
                    <div
                      key={doc.title}
                      className="col-span-1 mx-2 mb-2 overflow-hidden text-center"
                      style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      <Image
                        alt="Sektionens uppbyggnad"
                        height={100}
                        src="/document_stack.svg"
                        width={100}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              className="text-sm hover:text-blue-800 hover:underline"
                              href={doc.url}
                            >
                              {doc.title}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="bg-zWhite">
                            <p>{doc.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
              </div>
            </div>
            <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
              <SectionTitle className="mb-4">
                Sektionsmötet bestämmer
              </SectionTitle>
              <p>
                Sektionens högst beslutande organ är sektionsmötet som
                sammanträder minst 4 gånger varje år. På sektionsmötet avhandlas
                punkter så som inval, motioner, propositioner och
                interpellationer. Alla sektionens medlemmar är inbjudna till
                alla sektionsmöten och man uppmuntras starkt att gå på dessa.
                Alla beslut som tas på sektionsmötet är demokratiska där allas
                röst väger lika tungt. Finns det något du vill ändra på eller
                tycker du att sektionen saknar något? Isåfall kan du skriva en
                motion till sektionsmötet och skicka den till{" "}
                <a
                  className="text-blue-800 hover:underline"
                  href="mailto:ztyret@ztek.se"
                >
                  ztyret@ztek.se
                </a>{" "}
                senast 7 dagar innan sektionsmötet. Det går också att skriva en{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  href={"https://sv.wikipedia.org/wiki/Interpellation"}
                  target="_blank"
                >
                  interpellation
                </Link>{" "}
                till sektionsmötet där du kan ställa frågor till olika organ.
              </p>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper id="organ">
          <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-2 md:pr-20">
              <SectionTitle className="mb-4">
                Sektionsorgan och azpning
              </SectionTitle>
              <p>
                Sektionsföreningar och -utskott ligger under sektionen och är
                till för gemene teknolog. De kan antingen finnas för att främja
                ett specifikt intresse, exempelvis idrott eller en sittning,
                eller för att utföra ett uppdrag, till exempel anordna
                mottagning eller trycka en tidning. Sektionens olika organ och
                dess medlemmar hittar du{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  href="/student-division/committees"
                >
                  här
                </Link>
                .
                <br />
                <br />
                Det är sektionsmötet som bestämmer vilka som får sitta i vilka
                organ. Till sektionens hjälp finns valberedningen som anslår
                nomineringar innan varje sektionsmöte. Valberedningen finns till
                för att säkerhetsställa att alla sökande söker på lika villkor.
                Att bli nominerad till en post är inte det samma som att bli
                invald. En eller flera personer kan väljas in i ett organ utan
                att ha blivit nominerade.
                <br />
                <br />
                Inför varje sektionsmöte så brukar en azpning hållas. Detta är
                ett tillfälle att få större inblick i vad de olika organen
                håller på med och hur det är att vara sittande. Hur lång tid tar
                det egentligen att städa Gasquen eller hur många hamburgare
                hinner man grilla på en timme? Alla dessa svar kan du få om du
                azpar olika organ. Information om de olika azpningarna brukar
                anslås i vår Facebookgrupp,{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  href={"https://www.facebook.com/groups/activityatz"}
                  target="_blank"
                >
                  Activity@Z
                </Link>
                . Man kan azpa olika organ utan att söka till dem precis som man
                kan söka de olika organen utan att ha azpat. Följande organ har
                inval i dessa läsperioder:
              </p>
            </div>
            <div className="col-span-3 m-auto mt-8 md:col-span-1 lg:mt-0">
              <Image
                alt="Lucky luke poster"
                className="rotate-6"
                height={250}
                src="/zarmy.png"
                width={300}
              />
            </div>
            <div className="col-span-3">
              <div className="grid grid-cols-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="col-span-2 md:col-span-1">
                    <SecondaryTitle className="mb-2">
                      Läsperiod {num}
                    </SecondaryTitle>
                    {committeeData
                      ?.filter((c) => c.electionPeriod === num)
                      .map((committee) => (
                        <Link
                          key={`${num}${committee.name}`}
                          className="mb-2 flex items-center justify-start "
                          href={`student-division/committees/${committee.slug}`}
                        >
                          <CommitteeImage
                            alt={`${committee.name}s logotyp`}
                            className="mr-2 h-8 w-8"
                            filename={committee.image}
                          />
                          <p className="text-sm hover:underline md:text-base">
                            {committee.name}
                          </p>
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default StudentDivision;
export const getStaticProps: GetStaticProps = async () => {
  await ssg.document.getOneGroupByName.prefetch({ name: DOCUMENTGROUP_KEY });
  await ssg.committee.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
