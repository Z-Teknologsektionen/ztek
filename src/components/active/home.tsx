import type { FC } from "react";
import SectionTitle from "~/components/layout/SectionTitle";
import SectionWrapper from "~/components/layout/SectionWrapper";
import RoleWrapper from "../layout/RoleWrapper";

const ActiveHomePage: FC = () => {
  return (
    <RoleWrapper accountRole={undefined}>
      <SectionWrapper>
        <SectionTitle>Välkommen!</SectionTitle>
        <p>
          Här kan du som sektionsaktiv administrera olika delar av hemsidan
          beroende på din roll. Om du inte har tillgång till en sida som du tror
          att du borde ha tillgång till, kontakta då någon i Webbgruppen eller
          Informationsansvarig i Ztyret.
        </p>
      </SectionWrapper>
    </RoleWrapper>
  );
};

export default ActiveHomePage;
