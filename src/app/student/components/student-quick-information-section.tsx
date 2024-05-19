import type { FC } from "react";
import CenteredButtonWithLink from "~/components/buttons/centered-button-with-link";
import SecondaryTitle from "~/components/layout/secondary-title";
import SectionWrapper from "~/components/layout/section-wrapper";

export const StudentQuickInformationSection: FC = () => {
  return (
    <SectionWrapper className="p-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 my-4 flex flex-col rounded-md">
          <div className="pb-4">
            <SecondaryTitle center>Studiesocialt stöd</SecondaryTitle>
            <p className="mx-4">
              Vill du prata med någon, är orolig över dina studier eller
              rapportera vill något men vet inte riktigt vart du ska vända dig?
              Klicka här då.
            </p>
          </div>
          <CenteredButtonWithLink href="/student/student-health">
            Mer om studiesocialt stöd
          </CenteredButtonWithLink>
        </div>
        <div className="col-span-1 my-4 flex flex-col rounded-md">
          <div className="pb-4">
            <SecondaryTitle center>Söka Z?</SecondaryTitle>
            <p className="mx-4">
              Funderar du på om Z är rätt pogram för dig? Klicka här isåfall för
              att läsa mer om programmet och vad du kan förvänta dig!
            </p>
          </div>
          <CenteredButtonWithLink href="/student/new-student">
            Mer information
          </CenteredButtonWithLink>
        </div>
        <div className="col-span-1 my-4 flex flex-col rounded-md">
          <div className="pb-4">
            <SecondaryTitle center={true}>Påverka dina studier?</SecondaryTitle>
            <p className="mx-4">
              Vill du vara med och påverka dina studier? Klicka här för att få
              mer information om vad Zätas studienämnd kan hjälpa dig med.
            </p>
          </div>
          <CenteredButtonWithLink href="#snz">
            Mer information
          </CenteredButtonWithLink>
        </div>
      </div>
    </SectionWrapper>
  );
};
