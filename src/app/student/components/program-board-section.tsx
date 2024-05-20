import { Suspense, type FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import {
  ProgramBoardCards,
  ProgramBoardCardsSkeleton,
} from "./program-board-cards";

const ProgramBoardSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle className="mb-4">Programledningen</SectionTitle>
      <p>
        Z-programmet har en programledning som består av programansvarig,
        studievägledare och utbildningssekreterare. Programledningen jobbar med
        att säkra framtida kompetens inom Z-programmet och övervaka den
        nuvarande studieplanen. De arbetar också med att utveckla och förbättra
        programmet genom att ta emot och behandla feedback från de studenter som
        går på programmet.
      </p>

      <Suspense fallback={<ProgramBoardCardsSkeleton />}>
        <ProgramBoardCards />
      </Suspense>
    </SectionWrapper>
  );
};

export default ProgramBoardSection;
