import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import HeadLayout from "~/components/layout/HeadLayout";
import SecondaryTitle from "~/components/layout/SecondaryTitle";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { DOCUMENTGROUP_KEY } from ".";

export const StudentDivision: NextPage = () => {
  const { data, isLoading, isError } = api.document.getOneGroupByName.useQuery({
    name: DOCUMENTGROUP_KEY,
  });
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
                <Link href="/studentDivision/zaloonen">
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
                <Link href="#organ">Mer om azpning</Link>
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
                studiesociala frågor. Sektionen leds av Sektionsstyrelsen,
                Ztyret, som består av 6 förtroendevalda. De förtroendevalda är
                invalda postspecifikt och sitter i ett år. De sex posterna är:
                Ordförande, Vice ordförande, Ekonomiansvarig,
                Informationsansvarig, Nöjeslivsansvarig och SAMO.
                Sektionsstyrelsen lyder under sektionsmötet som sammanträder
                minst fyra gånger per år. Sektionsföreningar och -utskott ligger
                under sektionen och är till för gemene teknolog. De kan antingen
                finnas för att främja ett specifikt intresse, exempelvis idrott
                eller en sittning, eller för att utföra ett uppdrag, till
                exempel anordna mottagning eller trycka en tidning. Sektionen
                kan också tillsätta arbetsgrupper för specifika ändamål.
                <br />
                <br />
                Sektionen regleras stadgan, reglementet och andra styrdokument.
                För att uppdatera reglementet måste en proposition eller motion
                röstas igenom på ett sektionsmöte. Vid ändringar av stadga måste
                motionen eller propositionen röstas igeom på två sektionsmöten i
                följd. Sektionens olika styrdokument hittar du{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  href="documents"
                >
                  här
                </Link>
                .
              </p>
            </div>
            <div className="col-span-3 m-auto mt-8 lg:col-span-1 lg:mt-0">
              <Image
                alt="Sektionens uppbyggnad"
                height={250}
                src="/sektionens_uppbyggnad.png"
                width={300} />
              <p className="mt-4 text-center">Sektionens uppbyggnad</p>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper id="sektionsmote">
          <div className="grid grid-cols-3">
            <div className="order-last col-span-3 mx-auto mt-4 lg:order-first lg:col-span-1 lg:mt-8">
              <div className="grid grid-cols-4">
                {isLoading && <p>Läser in dokument...</p>}
                {isError && <p>Dokument kunde inte hämtas.</p>}
                {data &&
                  data.Document.map((doc) => (
                    <div
                      key={doc.title}
                      className="col-span-1 mx-2 text-center"
                    >
                      <Image
                        alt="Sektionens uppbyggnad"
                        className="col-span-1"
                        height={100}
                        src="/document_stack.svg"
                        width={100} />
                      <Link
                        className="text-sm hover:text-blue-800 hover:underline"
                        href={doc.url}
                      >
                        {doc.title}
                      </Link>
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
                interpellationer. Finns det något du vill ändra på eller något
                sektionen saknar? Isåfall kan du skriva en motion till
                sektionsmötet och skicka den till{" "}
                <a
                  className="text-blue-800 hover:underline"
                  href="mailto:ztyret@ztek.se"
                >
                  ztyret@ztek.se
                </a>{" "}
                senast 7 dagar innan sektionsmötet.
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
                mottagning eller trycka en tidning.
                <br />
                <br />
                Det är sektionsmötet
              </p>
            </div>
            <div className="col-span-3 m-auto mt-8 lg:col-span-1 lg:mt-0">
              <Image
                alt="Sektionens uppbyggnad"
                height={250}
                src="/sektionens_uppbyggnad.png"
                width={300} />
              <p className="mt-4 text-center">Sektionens uppbyggnad</p>
            </div>
          </div>
          <Button>
          </></SectionWrapper>
      </div>
    </>
  );
};
