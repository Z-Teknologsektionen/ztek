import type { FC } from "react";
import ImageWithCredit from "~/components/layout/image-with-credit";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";

export const ZaloonenIntroSection: FC = () => (
  <SectionWrapper>
    <SectionTitle className="mb-4">Zaloonen</SectionTitle>
    <div className="grid grid-cols-5 gap-x-20">
      <div className="col-span-full lg:col-span-3">
        <p className="max-w-3xl">
          Zaloonen är Z-sektionens sektionslokal och är belägen på bottenplan i
          HB. Som Z-teknolog finns det möjlighet att hålla arrangemang i
          Zaloonen. Inför arrangemang i Zaloonen kommer ZÅG ta ut en
          städdeposition som återfås vid godkänd avsyning. Avsyning sker alltid
          kl 07:30 på vardagar och 11:30 på helger, om ni inte har någon annan
          överenskommelse med ZÅG.
          <br />
          <br />
          När man arrangerar i Zaloonen är det viktigt att tänka på att lokalen
          tillhör alla Z-teknologer mellan 08:00 och 17:00. Då det ofta är högt
          söktryck på Zaloonen har vi i stort sett ingen möjlighet att tillåta
          arrangemang som inte har med Z-sektionen att göra.
          <br />
          <br />
          Vi rekommenderar er som studerar på annan sektion att i första hand
          söka lokal inom egen sektion eller någon av Chalmers icke
          sektionsbundna lokaler och under tentaveckorna är vi väldigt
          restriktiva med arrangemang i Zaloonen då den behövs som studielokal.
          <br />
          <br />
        </p>
      </div>
      <div className="col-span-full mt-4 max-w-md lg:col-span-2">
        <ImageWithCredit
          alt="Bild på Zaloonen"
          height={1000}
          photoCommittee="zFoto"
          photographer="Dennis Holmström"
          src="/zaloonen.jpg"
          width={1000}
        />
      </div>
    </div>
  </SectionWrapper>
);
