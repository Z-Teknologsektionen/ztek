import type { FC } from "react";
import RoleWrapper from "~/components/layout/role-wrapper";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";

const ActiveStartTab: FC = () => {
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

export default ActiveStartTab;
