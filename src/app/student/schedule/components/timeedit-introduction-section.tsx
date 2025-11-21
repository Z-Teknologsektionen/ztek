import { type FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";

const TimeEditIntroductionSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Schemat finns på TimeEdit</SectionTitle>
      <p>
        Schemat för Z-teknologer, och teknologer på Chalmers i allmännhet, finns
        på{" "}
        <StyledLink href="https://cloud.timeedit.net/chalmers/web/public/">
          TimeEdit
        </StyledLink>
        . Vill man boka grupprum, så behöver man{" "}
        <StyledLink href="https://cloud.timeedit.net/chalmers/web/student/">
          logga in
        </StyledLink>{" "}
        på TimeEdit. För att hitta sitt schema, kan man söka på sin klass.
        Notera att även om sektionen betecknas Z, betecknas programmet TKAUT. På
        samma vis kallas klasserna TKAUT-1, TKAUT-2, etc.
      </p>
    </SectionWrapper>
  );
};

export default TimeEditIntroductionSection;
