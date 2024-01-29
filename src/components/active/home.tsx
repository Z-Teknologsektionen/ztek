import type { FC } from "react";
import RoleWrapper from "../layout/RoleWrapper";
import TabInformationSection from "./tab-information-section";

const ActiveHomePage: FC = () => {
  return (
    <RoleWrapper accountRole={undefined}>
      <TabInformationSection
        description=" Här kan du som sektionsaktiv administrera olika delar av hemsidan
          beroende på din roll. Om du inte har tillgång till en sida som du tror
          att du borde ha tillgång till, kontakta då någon i Webbgruppen eller
          Informationsansvarig i Ztyret."
        title="Välkommen!"
      />
    </RoleWrapper>
  );
};

export default ActiveHomePage;
