import type { FC } from "react";
import CenteredButtonWithLink from "~/components/buttons/centered-button-with-link";
import ImageWithDescription from "~/components/layout/image-with-description";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";

export const StudentSNZSection: FC = () => {
  return (
    <SectionWrapper id="snz">
      <div className="grid grid-cols-3 gap-x-10 gap-y-4">
        <div className="order-last col-span-3 m-2 lg:order-first lg:col-span-1">
          <ImageWithDescription
            alt="SNZ:s logga"
            description="SNZ - Sektionens studienämnd"
            height={300}
            src="/SNZ.png"
            width={300}
          />
        </div>
        <div className="order-first col-span-3 pl-4 lg:order-last lg:col-span-2">
          <SectionTitle className="mb-4">Påverka dina studier</SectionTitle>
          <p>
            Automation och Mekatronik har en dedikerad Studienämnd som heter SNZ
            och inriktar sig på att främja en högkvalitativ och givande
            utbildning inom sektionens programplan. SNZ har en central roll i
            sektionens verksamhet och utbildningsarbete.
            <br />
            <br />
            SNZ arbetar nära samman med programledningen för att utveckla och
            förbättra de olika kurserna som ges inom programmet. De övervakar
            kurserna och utvärderar deras kvalitet för att säkerställa att
            studenterna får den bästa möjliga utbildningen. Feedback från
            studenter är oerhört viktig för dem, och de arbetar aktivt med att
            ta emot och behandla detta för att ständigt förbättra utbildningen.
            <br />
            <br />
            SNZ består av medlemmar från sektionen och möts regelbundet för att
            diskutera och påverka utbildningsfrågor genom möten med
            programansvariga och föreläsare. På SNZ:s hemsida kan du få mer
            information om kommitténs arbete, deras medlemmar och deras pågående
            projekt och initiativ inom sektionen. Om du har frågor eller
            feedback gällande utbildning inom programmet kan du kontakta SNZ via
            deras hemsida.
          </p>
          <CenteredButtonWithLink
            className="mt-2"
            href="https://snz.se"
            target="_blank"
          >
            Gå till snz.se
          </CenteredButtonWithLink>
        </div>
      </div>
    </SectionWrapper>
  );
};
