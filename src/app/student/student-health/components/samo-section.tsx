import { Suspense, type FC } from "react";
import SectionTitle from "~/components/layout/section-title";
import SectionWrapper from "~/components/layout/section-wrapper";
import {
  SamoInformationSubSection,
  SamoInformationSubSectionSkeleton,
} from "./samo-information-sub-section";

export const SamoSection: FC = () => {
  return (
    <SectionWrapper>
      <Suspense fallback={<SamoInformationSubSectionSkeleton />}>
        <SamoInformationSubSection />
      </Suspense>
      <div className="grid grid-cols-2 py-8">
        <div className="col-span-2 lg:col-span-1 lg:pr-20">
          <SectionTitle className="pb-4">Informera SAMO</SectionTitle>
          <p>
            För att du ska kunna förmedla information anonymt till SAMO (eller
            hela styrelsen) erbjuds ett särskilt formulär. Detta formulär kan
            användas för olika ändamål:
          </p>
          <ul className="my-2 list-disc px-4">
            <li>
              För att delge information utan att avslöja din identitet, särskilt
              när ämnet är känsligt eller om du inte önskar att ditt namn
              avslöjas. Denna funktion möjliggör rapportering av ärenden som kan
              röra dig själv eller andra.
            </li>
            <li>
              För att rapportera arbetsmiljörelaterade problem och
              felaktigheter.
            </li>
            <li>
              För att förmedla generell information eller ärenden som du anser
              att bara SAMO eller hela Ztyret bör vara medvetna om.
            </li>
          </ul>
          <p>
            Du har även möjlighet att självständigt ange dina kontaktuppgifter
            om du önskar återkoppling, vilket kan ses som ett komplement till
            att skicka e-post. Du har också möjlighet att välja om endast SAMO
            ska få tillgång till den inskickade informationen eller om hela
            styrelsen ska vara informerad. För ytterligare information och
            detaljer, rekommenderas att du konsulterar det specifika formuläret.
          </p>
        </div>
        <div className="col-span-2 mt-4 h-96 w-full lg:col-span-1 lg:mt-0 lg:h-full">
          <iframe
            className="aspect-auto h-full w-full"
            src="https://docs.google.com/forms/d/e/1FAIpQLSckHuuypoZ0AhazgZpA8V8FjClU1um5bm5STzbfp1rw78ARZQ/viewform?embedded=true"
            title="Informera SAMO"
          >
            Läser in...
          </iframe>
        </div>
      </div>
    </SectionWrapper>
  );
};
