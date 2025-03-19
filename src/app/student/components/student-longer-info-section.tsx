import type { FC } from "react";
import ImageWithCredit from "~/components/layout/image-with-credit";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";

export const StudentLongerInfoSection: FC = () => {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-3 gap-x-10 gap-y-4">
        <div className="col-span-3 md:col-span-2">
          <SectionTitle className="mb-4">Student</SectionTitle>
          <p>
            Som student på Chalmers och Z-programmet finns det många olika
            möjligheter att få hjälp och möjlighet att påverka dina studier. Här
            nedanför finns lite information om vad som finns tillgängligt för
            dig som student och information om programmet. Programmets
            studieplan hittar du på{" "}
            <StyledLink
              href="https://www.chalmers.se/utbildning/hitta-program/automation-och-mekatronik-civilingenjor/"
              target="_blank"
            >
              Chalmers hemsida
            </StyledLink>{" "}
            där du också kan läsa mer om de olika kurserna som du läser varje
            år. Som student på Z-programmet har man stor möjlighet att välja
            olika mastrar beroende på intresseområde då över 20 olika
            masterprogram är valbara för Z-studenter. Alla masterprogram och
            dess specifika förkunskapskrav hittar du på samma sida som
            programplanen.
          </p>
        </div>
        <div className="col-span-full mx-auto md:col-span-1">
          <ImageWithCredit
            alt="Bild på Z-studenter"
            height={800}
            photoCommittee="zFoto"
            photographer="Casper Lundberg"
            src="/z_student.jpg"
            width={800}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};
