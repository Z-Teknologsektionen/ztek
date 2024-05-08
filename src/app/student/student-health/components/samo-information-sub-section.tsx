import type { FC } from "react";
import { getCommitteeMemberByEmail } from "~/app/student/student-health/utils/get-committee-member-by-email";
import CommitteeImage from "~/components/committees/committee-image";
import SectionTitle from "~/components/layout/section-title";

import { MdEmail, MdPhone } from "react-icons/md";
import { Skeleton } from "~/components/ui/skeleton";

const SAMO_EMAIL_KEY = "samo.ztyret@ztek.se";

export const SamoInformationSubSection: FC = async () => {
  const samo = await getCommitteeMemberByEmail(SAMO_EMAIL_KEY);

  return (
    <div className="grid grid-cols-3 py-8">
      <div className="order-last col-span-3 m-auto mt-4 lg:order-last lg:col-span-1 lg:mt-0">
        <CommitteeImage
          alt={`Profilbild på ${(samo && samo.name) || "SAMO"}`}
          filename={samo?.image}
        />
        {samo && samo.image !== "" ? (
          <p className="text-center">{samo.name}, SAMO på sektionen.</p>
        ) : (
          <p className="text-center">Profilbild saknas</p>
        )}
      </div>
      <div className="col-span-3 md:col-span-2">
        <SectionTitle className="break-words pb-4">
          Studerande ArbetsMiljöOmbud (SAMO)
        </SectionTitle>
        <p>
          Mitt namn är {(samo && samo.name) || "(namn saknas)"} och jag sitter
          som SAMO i styrelsen för Automation & Mekatronik. Det är min uppgift
          att jobba mot att förbättra studiemiljön i de lokaler du som Z-student
          har tillgång till. Det är även min uppgift att jobba mot en bättre
          studenthälsa genom att ha en bra psykosocial studiemiljö. Mig kan du
          nå via mejl, personligen eller via det anonyma formuläret ovanför. Om
          du känner behov av att komma i kontakt med någon, men inte vet vart du
          skall vända dig kan du kontakta mig.
        </p>
        <ul className="mt-6">
          <li className="mb-2 flex items-center justify-center md:justify-start">
            <MdEmail className="mr-2" />
            <a
              className="hover:underline"
              href={`mailto:${samo ? samo.email : "samo@ztek.se"}`}
            >
              {samo ? samo.email : "samo@ztek.se"}
            </a>
          </li>
          <li className="mb-2 flex items-center justify-center md:justify-start">
            <MdPhone className="mr-2" />
            {samo ? (
              <a href={`tel:${samo.phone}`}>{samo.phone}</a>
            ) : (
              <p>Inget telefonnummer finns</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export const SamoInformationSubSectionSkeleton: FC = () => (
  <div className="!mt-0 grid grid-cols-3 py-8">
    <div className="order-last col-span-3 m-auto mt-4 lg:order-last lg:col-span-1 lg:mt-0">
      <Skeleton className="mx-auto h-64 w-64 rounded " />
      <Skeleton className="h-6 w-full" />
    </div>
    <div className="col-span-3 md:col-span-2">
      <Skeleton className="h-9 w-full pb-4" />
      <Skeleton className="h-32 w-full pb-4" />
      <ul className="mt-6">
        <li className="mb-2 flex items-center justify-center md:justify-start">
          <Skeleton className="h-6 w-full" />
        </li>
        <li className="mb-2 flex items-center justify-center md:justify-start">
          <Skeleton className="h-6 w-full" />
        </li>
      </ul>
    </div>
  </div>
);
