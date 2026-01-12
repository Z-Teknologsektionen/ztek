import { type FC } from "react";

import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import CopyButton from "~/components/ui/copy-button";
import { Label } from "~/components/ui/label";

import ScheduleLinkGenerator from "./schedule-link-generator";

const ScheduleLinkGeneratorSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Generera en kalenderprenumerationslänk</SectionTitle>
      <p>
        Kalendern som kan prenumereras på från TimeEdit kan vara något svårläst.
        För att Z-teknologer ska få det lättare att läsa sina kalendrar finns
        ett API för att förenkla kalendrar från Chalmers TimeEdit.
      </p>
      <p>
        Tyvärr finns inget som tyder på att TimeEdit-kalendrarna från Chalmers
        kommer att fortsätta se likadana ut. Därför finns en möjlighet att
        API:et slutar fungera som förväntat inom en snar eller avlägsen framtid.
        Webbgruppen tar inte ansvar för missade föreläsningar.
        <span className="text-red-500 dark:text-red-900">
          <b> TL;DR; </b> Använd på egen risk!
        </span>
      </p>

      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        <div className="grow-[2]">
          <ScheduleLinkGenerator />
        </div>

        <div className="flex grow-[1] flex-row items-center justify-center gap-4 md:flex-col">
          <Label>
            <p className="py-1">TKAUT-1</p>
            <CopyButton value="https://ztek.se/api/ics/ri6otYf5Z1fZYZQ6Zn4fe9j35116yQ5QdQ8cQYWQuZ7b3XQ5lm7Zo820860A4kD349E58F7E5721m8Z4F1Dt3oEEQ8476834F6D35E25" />
          </Label>

          <Label>
            <p className="py-1">TKAUT-2</p>
            <CopyButton value="https://ztek.se/api/ics/ri6otYf5Z1fZYZQ1Zn4fe9j35186yQ5QdQ8cQYWQuZ7b3XQ5lm7Zo8E0B1044k5D49C5879C5720mDZ4348t8o58Q8976371057C47588" />
          </Label>

          <Label>
            <p className="py-1">TKAUT-3</p>
            <CopyButton value="https://ztek.se/api/ics/ri6otYf5Z1fZYZQ2Zn4fe9j35176yQ5QdQ8cQYWQuZ7b3XQ5lm7Zo81069034k084939817E4729m8Z4105tCoABQ8C76AF7002E690C7" />
          </Label>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ScheduleLinkGeneratorSection;
