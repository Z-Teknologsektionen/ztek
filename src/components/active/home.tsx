import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";

const ActiveHomePage: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Välkommen!</SectionTitle>
      <p>
        Här kan du som sektionsaktiv administrera olika delar av hemsidan
        beroende på din roll. Om du inte har tillgång till en sida som du tror
        att du borde ha tillgång till, kontakta då någon i Webbgruppen eller
        Informationsansvarig i Ztyret.
      </p>
    </SectionWrapper>
  );
};

export default ActiveHomePage;
