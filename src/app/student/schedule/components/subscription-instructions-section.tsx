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
        <div className="order-last col-span-1 space-y-4 lg:order-last lg:col-span-2">
          <p>
            För att få en prenumerationslänk från TimeEdit, kan följande göras:
          </p>
          <ol className="list-decimal pl-6">
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
            <li>Tryck på &quot;Prenumerera&quot; i det övre verktygsfältet</li>
            <li>Kopiera länken i popup-fönstret</li>
          </ol>
        </div>
        <Image
          alt="Instruktioner för kalenderprenumeration"
          height={531}
          src="/TimeEdit_instructions.png"
          width={689}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="order-last col-span-1 space-y-4 lg:order-first lg:col-span-2">
          <p>
            För att få Google kalender att prenumerera på en kalender, kan
            följande göras i webbgränssnittet:
          </p>
          <ol className="list-decimal pl-6">
            <li>
              Gå till{" "}
              <StyledLink href={"https://calendar.google.com"}>
                Google kalender
              </StyledLink>
            </li>
            <li>
              Tryck på &quot;+&quot; under &quot;Andra kalendrar&quot; i
              sidopanelen
            </li>
            <li>Välj &quot;Från webbadress&quot; i menyn</li>
            <li>
              Klistra in en prenumerationslänk i fältet &quot;Kalenderns
              webbadress&quot;
            </li>
            <li>Tryck &quot;Lägg till kalender&quot;</li>
          </ol>
          <p>
            För att få din prenumererade kalender att visas i Google
            kalenderappen, kan följande göras:
          </p>
          <ol className="mt-2 list-decimal pl-6">
            <li>Öppna sidopanelen</li>
            <li>Välj &quot;Settings&quot; längst ned</li>
            <li>Välj kalendern du nyss lade till genom webbgränssittet</li>
            <li>Slå på alternativet &quot;Sync&quot;</li>
          </ol>
        </div>
        <Image
          alt="Instruktioner för kalenderprenumeration"
          height={853}
          src="/GCal_instructions.png"
          width={840}
        />
      </div>
    </SectionWrapper>
  );
};

export default SubscriptionInstructionsSection;
