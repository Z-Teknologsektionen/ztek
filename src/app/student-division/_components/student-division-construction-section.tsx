import Link from "next/link";
import type { FC } from "react";
import ImageWithDescription from "~/components/layout/image-with-description";
import { SectionWithItemAndText } from "~/components/layout/section-with-item-and-text";

export const StudentDivisionConstructionSection: FC = () => {
  return (
    <SectionWithItemAndText
      itemContent={
        <ImageWithDescription
          alt="Sektionens uppbyggnad"
          className="h-full justify-center"
          description="Sektionens uppbyggnad"
          height={250}
          src="/sektionens_uppbyggnad.png"
          width={300}
        />
      }
      textContent={
        <p>
          Teknologsektionen för Automation och Mekatronik vid Chalmers
          Studentkår är en ideell förening som har till uppgift att verka för
          sammanhållning mellan sina medlemmar och skall tillvarata deras
          gemensamma intressen i främst utbildningsfrågor och studiesociala
          frågor.
          <br />
          <br />
          Som Z-student på Chalmers är du automatiskt medlem i Chalmers
          studentkår och därmed också i Z-Teknologsektionen. Sektionen erbjuder
          många möjligheter att få ut mer av din studietid. Du kan engagera dig
          i sektionens verksamhet, delta i olika arrangemang och aktiviteter,
          eller bara hänga med dina vänner i sektionslokalen.
          <br />
          <br />
          Sektionen leds av Sektionsstyrelsen, Ztyret, som består av 6
          förtroendevalda. Sektionsstyrelsen lyder under sektionsmötet som
          sammanträder minst fyra gånger per år. Sektionsföreningar och -utskott
          ligger under sektionen och är till för gemene teknolog. De kan
          antingen finnas för att främja ett specifikt intresse, exempelvis
          idrott eller en sittning, eller för att utföra ett uppdrag, till
          exempel anordna mottagning eller trycka en tidning. Sektionen kan
          också tillsätta arbetsgrupper för specifika ändamål.
          <br />
          <br />
          Sektionen regleras stadgan, reglementet och andra styrdokument. För
          att uppdatera reglementet måste en proposition eller motion röstas
          igenom på ett sektionsmöte. Vid ändringar av stadga måste motionen
          eller propositionen röstas igeom på två sektionsmöten i följd.
          Sektionens olika styrdokument hittar du{" "}
          <Link
            className="text-blue-600 hover:text-blue-800 hover:underline"
            href="/documents"
          >
            här
          </Link>
          .
        </p>
      }
      title="Z-Teknologsektionen"
    />
  );
};
