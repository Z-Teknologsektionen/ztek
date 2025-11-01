import Image from "next/image";
import { type FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import StyledLink from "~/components/layout/styled-link";

const SubscriptionInstructionsSection: FC = () => {
  return (
    <SectionWrapper>
      <SectionTitle>Prenumerera på kalendrar</SectionTitle>
      <p>
        Prenumerationslänkar är länkar som leder till .ics kalenderfiler som
        emellanåt uppdateras, vanligen för att kalendern ska visa schemat för
        aktuell tidsperiod.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="order-last col-span-1 lg:order-last lg:col-span-2">
          <p>
            För att få en prenumerationslänk från TimeEdit, kan följande göras:
          </p>
          <ol className="mt-2 list-decimal pl-6">
            <li>
              Gå till{" "}
              <StyledLink
                href={"https://cloud.timeedit.net/chalmers/web/student/"}
              >
                Chalmers TimeEdit
              </StyledLink>
            </li>
            <li>
              Leta fram ditt schema (om du inte vet vilken klass du år i, går du
              troligen i TKAUT-1)
            </li>
            <li>Tryck på "Prenumerera" i det övre verktygsfältet</li>
            <li>Kopiera länken i popup-fönstret</li>
          </ol>
        </div>
        <Image
          src="/TimeEdit_instructions.png"
          width={689}
          height={531}
          alt="Instruktioner för kalenderprenumeration"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="order-last col-span-1 lg:order-first lg:col-span-2">
          <p>
            För att få din Google-kalender att prenumerera på en kalender, kan
            följande göras i webbgränssnittet:
          </p>
          <ol className="mt-2 list-decimal pl-6">
            <li>
              Gå till{" "}
              <StyledLink href={"calendar.google.com"}>
                Google kalender
              </StyledLink>
            </li>
            <li>Tryck på "+" under "Andra kalendrar" i sidopanelen</li>
            <li>Välj "Från webbadress" i menyn</li>
            <li>
              Klistra in en prenumerationslänk i fältet "Kalenderns webbadress"
            </li>
            <li>Tryck "Lägg till kalender"</li>
          </ol>
        </div>
        <Image
          src="/GCal_instructions.png"
          alt="Instruktioner för kalenderprenumeration"
          height={853}
          width={840}
        />
      </div>
    </SectionWrapper>
  );
};

export default SubscriptionInstructionsSection;
