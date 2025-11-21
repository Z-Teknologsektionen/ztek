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
            <CopyButton value="http://localhost:5000/api/ics/ri6y7YQQu9QZnZQ18Z40beZ35685Q" />
          </Label>

          <Label>
            <p className="py-1">TKAUT-2</p>
            <CopyButton value="http://localhost:5000/api/ics/ri6y7YQQu9QZnZQ18Z40beZ35685Q" />
          </Label>

          <Label>
            <p className="py-1">TKAUT-3</p>
            <CopyButton value="http://localhost:5000/api/ics/ri6y7YQQu9QZnZQ18Z40beZ35685Q" />
          </Label>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ScheduleLinkGeneratorSection;
