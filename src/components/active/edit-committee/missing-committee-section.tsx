import type { FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";

const MissingCommitteeSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Du existerar inte.</SectionTitle>
      Webbgruppen har inte lagt till dig som medlem i någon kommitté än.
      Kontakta dem för att få tillgång till denna sida.
      <br />
      Se till att vara inloggad med din postspecifika mail och inte hela
      organets mail.
    </SectionWrapper>
  );
};

export default MissingCommitteeSection;
