import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { getAllCommittees } from "~/app/student-division/committees/_utils/get-all-committees";
import { CommitteeImage } from "~/components/committees/committee-image";
import SecondaryTitle from "~/components/layout/secondary-title";
import { SectionWithItemAndText } from "~/components/layout/section-with-item-and-text";
import StyledLink from "~/components/layout/styled-link";
export const StudentDivisionCommitteesSection: FC = async () => {
  const committeeData = await getAllCommittees();

  return (
    <SectionWithItemAndText
      id="organ"
      itemContent={
        <Image
          alt="Lucky luke poster"
          className="rotate-6"
          height={250}
          src="/zarmy.png"
          width={300}
        />
      }
      textContent={
        <p>
          Sektionsföreningar och -utskott ligger under sektionen och är till för
          gemene teknolog. De kan antingen finnas för att främja ett specifikt
          intresse, exempelvis idrott eller en sittning, eller för att utföra
          ett uppdrag, till exempel anordna mottagning eller trycka en tidning.
          Sektionens olika organ och dess medlemmar hittar du{" "}
          <StyledLink href="/student-division/committees">här</StyledLink>
          .
          <br />
          <br />
          Det är sektionsmötet som bestämmer vilka som får sitta i vilka organ.
          Till sektionens hjälp finns valberedningen som anslår nomineringar
          innan varje sektionsmöte. Valberedningen finns till för att
          säkerhetsställa att alla sökande söker på lika villkor. Att bli
          nominerad till en post är inte det samma som att bli invald. En eller
          flera personer kan väljas in i ett organ utan att ha blivit
          nominerade.
          <br />
          <br />
          Inför varje sektionsmöte så brukar en azpning hållas. Detta är ett
          tillfälle att få större inblick i vad de olika organen håller på med
          och hur det är att vara sittande. Hur lång tid tar det egentligen att
          städa Gasquen eller hur många hamburgare hinner man grilla på en
          timme? Alla dessa svar kan du få om du azpar olika organ. Information
          om de olika azpningarna brukar anslås hos{" "}
          <StyledLink href="https://orbiapp.io/student" target="_blank">
            Orbi
          </StyledLink>
          . Man kan azpa olika organ utan att söka till dem precis som man kan
          söka de olika organen utan att ha azpat. Följande organ har inval i
          dessa läsperioder:
        </p>
      }
      title="Sektionsorgan och azpning"
    >
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className="col-span-2 flex flex-col gap-2 md:col-span-1"
          >
            <SecondaryTitle>Läsperiod {num}</SecondaryTitle>
            {committeeData
              ?.filter((committee) => committee.electionPeriods.includes(num))
              .map((committee) => (
                <Link
                  key={`${num}${committee.name}`}
                  className="flex items-center justify-start gap-2"
                  href={`student-division/committees/${committee.slug}`}
                >
                  <CommitteeImage
                    alt={`${committee.name}s logotyp`}
                    className="mx-0 h-8 w-8"
                    filename={committee.image}
                  />
                  <p className="truncate text-sm hover:underline md:text-base">
                    {committee.name}
                  </p>
                </Link>
              ))}
          </div>
        ))}
      </div>
    </SectionWithItemAndText>
  );
};
